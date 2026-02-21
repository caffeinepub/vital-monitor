import { MovementAnomaly } from '../backend';
import { formatTimestamp } from '../utils/timeUtils';
import { AlertTriangle, Clock } from 'lucide-react';

interface AnomalyListItemProps {
  anomaly: MovementAnomaly;
  isRecent: boolean;
}

export function AnomalyListItem({ anomaly, isRecent }: AnomalyListItemProps) {
  return (
    <div 
      className={`p-4 rounded-lg border transition-all ${
        isRecent 
          ? 'border-health-warning bg-health-warning/5 shadow-sm' 
          : 'border-health-border bg-gray-50/50'
      }`}
    >
      <div className="flex items-start gap-3">
        <div className={`mt-0.5 ${isRecent ? 'text-health-warning' : 'text-health-text-secondary'}`}>
          <AlertTriangle className="w-5 h-5" />
        </div>
        <div className="flex-1 space-y-1">
          <p className="text-sm font-medium text-health-text-primary">
            {anomaly.description}
          </p>
          <div className="flex items-center gap-2 text-xs text-health-text-secondary">
            <Clock className="w-3 h-3" />
            <span>{formatTimestamp(anomaly.timestamp)}</span>
            {isRecent && (
              <span className="px-2 py-0.5 rounded-full bg-health-warning/10 text-health-warning font-medium">
                Recent
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
