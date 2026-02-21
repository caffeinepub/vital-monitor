import { AlarmEvent } from '../backend';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { Button } from './ui/button';
import { Bell, X } from 'lucide-react';
import { formatTimestamp } from '../utils/timeUtils';

interface AlarmCardProps {
  alarm: AlarmEvent;
  onDismiss: () => void;
}

export function AlarmCard({ alarm, onDismiss }: AlarmCardProps) {
  return (
    <Alert variant="destructive" className="border-health-critical bg-health-critical/5">
      <Bell className="h-5 w-5" />
      <div className="flex-1 ml-2">
        <AlertTitle className="flex items-center justify-between">
          <span>Critical Alert</span>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={onDismiss}
            className="h-6 w-6 p-0 hover:bg-health-critical/10"
          >
            <X className="h-4 w-4" />
          </Button>
        </AlertTitle>
        <AlertDescription className="mt-2">
          <div className="space-y-1">
            <p className="font-medium">{alarm.message}</p>
            <p className="text-xs opacity-80">{formatTimestamp(alarm.timestamp)}</p>
          </div>
        </AlertDescription>
      </div>
    </Alert>
  );
}
