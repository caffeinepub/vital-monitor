import { useState, useEffect } from 'react';
import { useAlarmEvents as useAlarmEventsQuery } from './useQueries';
import { AlarmEvent } from '../backend';

const DISMISSED_ALARMS_KEY = 'dismissedAlarms';

export function useAlarmEvents() {
  const { data: allAlarms = [] } = useAlarmEventsQuery('7d');
  const [dismissedTimestamps, setDismissedTimestamps] = useState<Set<string>>(new Set());

  // Load dismissed alarms from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(DISMISSED_ALARMS_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setDismissedTimestamps(new Set(parsed));
      } catch (e) {
        console.error('Failed to parse dismissed alarms', e);
      }
    }
  }, []);

  const dismissAlarm = (timestamp: bigint) => {
    const timestampStr = timestamp.toString();
    const newDismissed = new Set(dismissedTimestamps);
    newDismissed.add(timestampStr);
    setDismissedTimestamps(newDismissed);
    localStorage.setItem(DISMISSED_ALARMS_KEY, JSON.stringify(Array.from(newDismissed)));
  };

  const activeAlarms = allAlarms.filter(
    alarm => !dismissedTimestamps.has(alarm.timestamp.toString())
  );

  return {
    activeAlarms,
    allAlarms,
    dismissAlarm
  };
}
