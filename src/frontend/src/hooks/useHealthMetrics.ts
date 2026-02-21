import { useHealthMetrics as useHealthMetricsQuery } from './useQueries';
import { DateRange } from '../components/DateRangeSelector';

export function useHealthMetrics(dateRange?: DateRange) {
  return useHealthMetricsQuery(dateRange || '24h');
}
