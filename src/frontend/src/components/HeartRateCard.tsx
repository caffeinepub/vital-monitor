import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Activity } from 'lucide-react';
import { Badge } from './ui/badge';
import { formatTimestamp } from '../utils/timeUtils';

interface HeartRateCardProps {
  heartRate: number;
  timestamp: bigint;
}

export function HeartRateCard({ heartRate, timestamp }: HeartRateCardProps) {
  const getHeartRateStatus = (bpm: number): { label: string; color: string; bgColor: string } => {
    if (bpm < 60) return { label: 'Low', color: 'text-health-warning', bgColor: 'bg-health-warning/10' };
    if (bpm <= 100) return { label: 'Normal', color: 'text-health-normal', bgColor: 'bg-health-normal/10' };
    if (bpm <= 120) return { label: 'Elevated', color: 'text-health-warning', bgColor: 'bg-health-warning/10' };
    return { label: 'High', color: 'text-health-critical', bgColor: 'bg-health-critical/10' };
  };

  const status = getHeartRateStatus(heartRate);

  return (
    <Card className="border-health-border bg-white shadow-health hover:shadow-health-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium text-health-text-secondary flex items-center gap-2">
            <img 
              src="/assets/generated/heart-pulse-icon.dim_128x128.png" 
              alt="Heart Rate" 
              className="w-5 h-5"
            />
            Heart Rate
          </CardTitle>
          <Badge variant="outline" className={`${status.bgColor} ${status.color} border-0`}>
            {status.label}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold text-health-text-primary">{heartRate}</span>
            <span className="text-lg text-health-text-secondary">BPM</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-health-text-secondary">
            <Activity className="w-3 h-3" />
            <span>Updated {formatTimestamp(timestamp)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
