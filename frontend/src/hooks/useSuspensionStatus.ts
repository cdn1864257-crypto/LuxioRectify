import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { getApiUrl } from '../lib/config';

export interface SuspensionStatus {
  status: 'active' | 'suspended' | 'blocked';
  isSuspended: boolean;
  unpaidOrdersCount: number;
  suspendedUntil?: string;
  suspendedUntilFormatted?: string;
  recentUnpaidOrders?: Array<{
    orderId: string;
    amount: number;
    status: 'expired' | 'cancelled';
    createdAt: string;
  }>;
}

export function useSuspensionStatus() {
  const { user } = useAuth();
  const [suspensionStatus, setSuspensionStatus] = useState<SuspensionStatus | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSuspensionStatus = async () => {
    if (!user) {
      setSuspensionStatus(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(getApiUrl('/api/user/suspension-status'), {
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        setSuspensionStatus(data);
      } else if (response.status === 401) {
        setSuspensionStatus(null);
      } else {
        setError('Failed to fetch suspension status');
      }
    } catch (err) {
      console.error('Error fetching suspension status:', err);
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSuspensionStatus();
  }, [user]);

  return {
    suspensionStatus,
    loading,
    error,
    refetch: fetchSuspensionStatus
  };
}
