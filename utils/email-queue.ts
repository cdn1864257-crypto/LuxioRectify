interface EmailJob {
  id: string;
  to: string;
  subject: string;
  html: string;
  from: string;
  attempts: number;
  maxAttempts: number;
  createdAt: number;
  nextRetryAt: number;
}

class EmailQueue {
  private queue: Map<string, EmailJob> = new Map();
  private processing = false;
  private processingInterval: NodeJS.Timeout | null = null;

  constructor() {
    this.startProcessing();
  }

  private startProcessing(): void {
    if (this.processingInterval) return;

    this.processingInterval = setInterval(() => {
      this.processQueue();
    }, 5000);
  }

  addJob(job: Omit<EmailJob, 'id' | 'attempts' | 'createdAt' | 'nextRetryAt'>): string {
    const id = `${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    
    const emailJob: EmailJob = {
      ...job,
      id,
      attempts: 0,
      createdAt: Date.now(),
      nextRetryAt: Date.now()
    };

    this.queue.set(id, emailJob);
    console.log(`[Email Queue] Job ${id} added to queue`);
    
    return id;
  }

  private async processQueue(): Promise<void> {
    if (this.processing || this.queue.size === 0) {
      return;
    }

    this.processing = true;
    const now = Date.now();

    for (const [id, job] of this.queue.entries()) {
      if (job.nextRetryAt > now) {
        continue;
      }

      try {
        console.log(`[Email Queue] Processing job ${id} (attempt ${job.attempts + 1}/${job.maxAttempts})`);
        
        await this.sendEmail(job);
        
        this.queue.delete(id);
        console.log(`[Email Queue] Job ${id} completed successfully`);
        
      } catch (error) {
        job.attempts++;
        
        if (job.attempts >= job.maxAttempts) {
          this.queue.delete(id);
          console.error(`[Email Queue] Job ${id} failed after ${job.maxAttempts} attempts:`, error);
        } else {
          const backoffDelay = Math.min(1000 * Math.pow(2, job.attempts), 60000);
          job.nextRetryAt = now + backoffDelay;
          
          console.warn(`[Email Queue] Job ${id} failed (attempt ${job.attempts}/${job.maxAttempts}), retrying in ${backoffDelay}ms`);
        }
      }
    }

    this.processing = false;
  }

  private async sendEmail(job: EmailJob): Promise<void> {
    const { sendEmailWithSendGrid } = await import('./sendgrid-service.js');
    
    await sendEmailWithSendGrid({
      to: job.to,
      from: job.from,
      subject: job.subject,
      text: job.subject,
      html: job.html
    });
  }

  getQueueSize(): number {
    return this.queue.size;
  }

  getQueueStats() {
    return {
      size: this.queue.size,
      jobs: Array.from(this.queue.values()).map(job => ({
        id: job.id,
        to: job.to.substring(0, 20) + '...',
        attempts: job.attempts,
        maxAttempts: job.maxAttempts,
        nextRetryAt: new Date(job.nextRetryAt).toISOString()
      }))
    };
  }

  stopProcessing(): void {
    if (this.processingInterval) {
      clearInterval(this.processingInterval);
      this.processingInterval = null;
    }
  }
}

const emailQueue = new EmailQueue();

export async function queueEmail(params: {
  to: string;
  subject: string;
  html: string;
  from: string;
  maxAttempts?: number;
}): Promise<string> {
  return emailQueue.addJob({
    to: params.to,
    subject: params.subject,
    html: params.html,
    from: params.from,
    maxAttempts: params.maxAttempts || 3
  });
}

export function getEmailQueueStats() {
  return emailQueue.getQueueStats();
}

export default emailQueue;

process.on('SIGTERM', () => {
  console.log('[Email Queue] SIGTERM received, stopping queue processing...');
  emailQueue.stopProcessing();
});

process.on('SIGINT', () => {
  console.log('[Email Queue] SIGINT received, stopping queue processing...');
  emailQueue.stopProcessing();
});
