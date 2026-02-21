import { DateRange } from '../components/DateRangeSelector';

// Convert JavaScript timestamp (milliseconds) to IC Time (nanoseconds)
export function msToNanoseconds(ms: number): bigint {
  return BigInt(ms) * BigInt(1_000_000);
}

// Convert IC Time (nanoseconds) to JavaScript timestamp (milliseconds)
export function nanosecondsToMs(ns: bigint): number {
  return Number(ns / BigInt(1_000_000));
}

// Format timestamp for display
export function formatTimestamp(timestamp: bigint): string {
  const date = new Date(nanosecondsToMs(timestamp));
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins} min ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

// Format timestamp for chart labels
export function formatChartTimestamp(timestamp: bigint): string {
  const date = new Date(nanosecondsToMs(timestamp));
  return date.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: false
  });
}

// Get date range in nanoseconds for backend queries
export function getDateRangeInNanoseconds(range: DateRange): { startTime: bigint; endTime: bigint } {
  const now = Date.now();
  const endTime = msToNanoseconds(now);
  
  let startMs: number;
  switch (range) {
    case '24h':
      startMs = now - 24 * 60 * 60 * 1000;
      break;
    case '7d':
      startMs = now - 7 * 24 * 60 * 60 * 1000;
      break;
    case '30d':
      startMs = now - 30 * 24 * 60 * 60 * 1000;
      break;
    default:
      startMs = now - 24 * 60 * 60 * 1000;
  }
  
  const startTime = msToNanoseconds(startMs);
  
  return { startTime, endTime };
}
