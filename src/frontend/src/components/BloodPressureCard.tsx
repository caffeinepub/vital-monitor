import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Activity } from 'lucide-react';
import { formatTimestamp } from '../utils/timeUtils';

interface BloodPressureCardProps {
  systolic: number;
  diastolic: number;
  timestamp: bigint;
}

export function BloodPressureCard({ systolic, diastolic, timestamp }: BloodPressureCardProps) {
  const getBPStatus = (sys: number, dia: number): { label: string; color: string; bgColor: string } => {
    if (sys < 120 && dia < 80) return { label: 'Normal', color: 'text-health-normal', bgColor: 'bg-health-normal/10' };
    if (sys < 130 && dia < 80) return { label: 'Elevated', color: 'text-health-warning', bgColor: 'bg-health-warning/10' };
    if (sys < 140 || dia < 90) return { label: 'High Stage 1', color: 'text-health-warning', bgColor: 'bg-health-warning/10' };
    return { label: 'High Stage 2', color: 'text-health-critical', bgColor: 'bg-health-critical/10' };
  };

  const status = getBPStatus(systolic, diastolic);

  return (
    <Card className="border-health-border bg-white shadow-health hover:shadow-health-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium text-health-text-secondary flex items-center gap-2">
            <img 
              src="/assets/generated/bp-monitor-icon.dim_128x128.png" 
              alt="Blood Pressure" 
              className="w-5 h-5"
            />
            Blood Pressure
          </CardTitle>
          <Badge variant="outline" className={`${status.bgColor} ${status.color} border-0`}>
            {status.label}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold text-health-text-primary">{systolic}</span>
            <span className="text-2xl font-semibold text-health-text-secondary">/</span>
            <span className="text-4xl font-bold text-health-text-primary">{diastolic}</span>
            <span className="text-lg text-health-text-secondary">mmHg</span>
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
