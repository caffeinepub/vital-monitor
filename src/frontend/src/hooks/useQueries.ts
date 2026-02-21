import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';
import { HealthMetric, MovementAnomaly, AlarmEvent } from '../backend';
import { getDateRangeInNanoseconds } from '../utils/timeUtils';
import { DateRange } from '../components/DateRangeSelector';

export function useHealthMetrics(dateRange: DateRange = '24h') {
  const { actor, isFetching } = useActor();
  const { startTime, endTime } = getDateRangeInNanoseconds(dateRange);

  return useQuery<HealthMetric[]>({
    queryKey: ['healthMetrics', dateRange],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getHealthMetrics(startTime, endTime);
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 5000, // Poll every 5 seconds
  });
}

export function useMovementAnomalies(dateRange: DateRange = '7d') {
  const { actor, isFetching } = useActor();
  const { startTime, endTime } = getDateRangeInNanoseconds(dateRange);

  return useQuery<MovementAnomaly[]>({
    queryKey: ['movementAnomalies', dateRange],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMovementAnomalies(startTime, endTime);
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 10000, // Poll every 10 seconds
  });
}

export function useAlarmEvents(dateRange: DateRange = '7d') {
  const { actor, isFetching } = useActor();
  const { startTime, endTime } = getDateRangeInNanoseconds(dateRange);

  return useQuery<AlarmEvent[]>({
    queryKey: ['alarmEvents', dateRange],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAlarmEvents(startTime, endTime);
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 5000, // Poll every 5 seconds for alarms
  });
}
