import { useAlarmEvents } from '../hooks/useAlarmEvents';
import { AlarmCard } from './AlarmCard';
import { Button } from './ui/button';
import { useState } from 'react';
import { AlarmHistoryView } from './AlarmHistoryView';
import { Bell, History } from 'lucide-react';

export function AlarmNotificationSystem() {
  const { activeAlarms, allAlarms, dismissAlarm } = useAlarmEvents();
  const [showHistory, setShowHistory] = useState(false);

  if (showHistory) {
    return <AlarmHistoryView alarms={allAlarms} onClose={() => setShowHistory(false)} />;
  }

  if (activeAlarms.length === 0) {
    return null;
  }

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img 
            src="/assets/generated/alarm-bell-icon.dim_96x96.png" 
            alt="Alarms" 
            className="w-6 h-6"
          />
          <h2 className="text-2xl font-semibold text-health-text-primary">Active Alarms</h2>
          <span className="px-2 py-1 rounded-full bg-health-critical text-white text-xs font-semibold">
            {activeAlarms.length}
          </span>
        </div>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => setShowHistory(true)}
          className="gap-2"
        >
          <History className="w-4 h-4" />
          View History
        </Button>
      </div>

      <div className="space-y-3">
        {activeAlarms.map((alarm, index) => (
          <AlarmCard 
            key={index} 
            alarm={alarm} 
            onDismiss={() => dismissAlarm(alarm.timestamp)}
          />
        ))}
      </div>
    </section>
  );
}
