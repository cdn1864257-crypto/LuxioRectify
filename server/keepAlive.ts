const BACKEND_URL = process.env.BACKEND_URL || 'https://api.luxiomarket.shop';
const PING_INTERVAL = 4 * 60 * 1000; // 4 minutes in milliseconds

let pingCount = 0;

async function pingBackend(): Promise<void> {
  try {
    const response = await fetch(`${BACKEND_URL}/ping`);
    if (response.ok) {
      pingCount++;
      console.log(`[KeepAlive] Ping #${pingCount} successful at ${new Date().toISOString()}`);
    } else {
      console.warn(`[KeepAlive] Ping failed with status: ${response.status}`);
    }
  } catch (error) {
    console.error(`[KeepAlive] Ping error:`, error instanceof Error ? error.message : 'Unknown error');
  }
}

export function startKeepAlive(): void {
  if (process.env.NODE_ENV !== 'production') {
    console.log('[KeepAlive] Skipping in development mode');
    return;
  }

  console.log(`[KeepAlive] Starting keep-alive service`);
  console.log(`[KeepAlive] Backend URL: ${BACKEND_URL}`);
  console.log(`[KeepAlive] Ping interval: ${PING_INTERVAL / 1000 / 60} minutes`);

  // Initial ping after 30 seconds (let server fully start)
  setTimeout(() => {
    pingBackend();
    
    // Then ping every 4 minutes
    setInterval(pingBackend, PING_INTERVAL);
  }, 30000);
}

export default startKeepAlive;
