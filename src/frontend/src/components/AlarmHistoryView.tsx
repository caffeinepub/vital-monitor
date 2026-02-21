import { AlarmEvent } from '../backend';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { ArrowLeft, Bell, Clock } from 'lucide-react';
import { formatTimestamp } from '../utils/timeUtils';
import { Alert, AlertDescription } from './ui/alert';

interface AlarmHistoryViewProps {
  alarms: AlarmEvent[];
  onClose: () => void;
}

export function AlarmHistoryView({ alarms, onClose }: AlarmHistoryViewProps) {
  const sortedAlarms = [...alarms].sort((a, b) => Number(b.timestamp - a.timestamp));

  return (
    <section className="space-y-4">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={onClose} className="gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>
        <div>
          <h2 className="text-2xl font-semibold text-health-text-primary">Alarm History</h2>
          <p className="text-sm text-health-text-secondary">Complete record of all alarm events</p>
        </div>
      </div>

      <Card className="border-health-border bg-white shadow-health">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5" />
            All Alarms ({sortedAlarms.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {sortedAlarms.length === 0 ? (
            <Alert>
              <AlertDescription>
                No alarm events recorded yet.
              </AlertDescription>
            </Alert>
          ) : (
            <div className="space-y-2">
              {sortedAlarms.map((alarm, index) => (
                <div 
                  key={index}
                  className="p-3 rounded-lg border border-health-border bg-gray-50/50 hover:bg-gray-100/50 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <Bell className="w-4 h-4 mt-0.5 text-health-critical" />
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium text-health-text-primary">{alarm.message}</p>
                      <div className="flex items-center gap-2 text-xs text-health-text-secondary">
                        <Clock className="w-3 h-3" />
                        <span>{formatTimestamp(alarm.timestamp)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
