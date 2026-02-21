import { useMovementAnomalies as useMovementAnomaliesQuery } from './useQueries';

export function useMovementAnomalies() {
  return useMovementAnomaliesQuery('7d');
}
