import { useEffect, useRef, useCallback } from 'react';

interface UseAutoLogoutOptions {
  timeout: number;
  onLogout: () => void;
  enabled?: boolean;
  warningTime?: number;
  onWarning?: () => void;
}

export function useAutoLogout({
  timeout,
  onLogout,
  enabled = true,
  warningTime,
  onWarning
}: UseAutoLogoutOptions) {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const warningTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastActivityRef = useRef<number>(Date.now());

  const clearTimers = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (warningTimeoutRef.current) {
      clearTimeout(warningTimeoutRef.current);
      warningTimeoutRef.current = null;
    }
  }, []);

  const handleLogout = useCallback(() => {
    clearTimers();
    console.log('[AutoLogout] Inactivity timeout reached, logging out...');
    onLogout();
  }, [clearTimers, onLogout]);

  const resetTimer = useCallback(() => {
    if (!enabled) return;

    lastActivityRef.current = Date.now();
    clearTimers();

    if (warningTime && onWarning) {
      const warningDelay = timeout - warningTime;
      if (warningDelay > 0) {
        warningTimeoutRef.current = setTimeout(() => {
          console.log('[AutoLogout] Warning: Session will expire soon');
          onWarning();
        }, warningDelay);
      }
    }

    timeoutRef.current = setTimeout(handleLogout, timeout);
  }, [enabled, timeout, warningTime, onWarning, clearTimers, handleLogout]);

  const handleActivity = useCallback(() => {
    resetTimer();
  }, [resetTimer]);

  useEffect(() => {
    if (!enabled) {
      clearTimers();
      return;
    }

    const events: (keyof WindowEventMap)[] = [
      'mousemove',
      'mousedown',
      'keydown',
      'touchstart',
      'scroll',
      'click',
      'wheel'
    ];

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        const inactiveTime = Date.now() - lastActivityRef.current;
        if (inactiveTime >= timeout) {
          handleLogout();
        } else {
          resetTimer();
        }
      }
    };

    events.forEach(event => {
      window.addEventListener(event, handleActivity, { passive: true });
    });
    document.addEventListener('visibilitychange', handleVisibilityChange);

    resetTimer();

    return () => {
      events.forEach(event => {
        window.removeEventListener(event, handleActivity);
      });
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      clearTimers();
    };
  }, [enabled, handleActivity, handleLogout, resetTimer, clearTimers, timeout]);

  const getRemainingTime = useCallback((): number => {
    const elapsed = Date.now() - lastActivityRef.current;
    return Math.max(0, timeout - elapsed);
  }, [timeout]);

  const extendSession = useCallback(() => {
    resetTimer();
  }, [resetTimer]);

  return {
    resetTimer,
    getRemainingTime,
    extendSession
  };
}

export default useAutoLogout;
