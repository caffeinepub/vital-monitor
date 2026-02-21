import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { DateRangeSelector, DateRange } from './DateRangeSelector';
import { HeartRateChart } from './HeartRateChart';
import { BloodPressureChart } from './BloodPressureChart';
import { useHealthMetrics } from '../hooks/useHealthMetrics';
import { Skeleton } from './ui/skeleton';
import { TrendingUp } from 'lucide-react';

export function HealthTrendsView() {
  const [dateRange, setDateRange] = useState<DateRange>('24h');
  const { data: metrics, isLoading } = useHealthMetrics(dateRange);

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-health-text-primary mb-1">Health Trends</h2>
          <p className="text-sm text-health-text-secondary">Historical data and patterns</p>
        </div>
        <DateRangeSelector value={dateRange} onChange={setDateRange} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="border-health-border bg-white shadow-health">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <TrendingUp className="w-5 h-5 text-health-primary" />
              Heart Rate Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-64 w-full" />
            ) : (
              <HeartRateChart data={metrics || []} />
            )}
          </CardContent>
        </Card>

        <Card className="border-health-border bg-white shadow-health">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <TrendingUp className="w-5 h-5 text-health-primary" />
              Blood Pressure Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-64 w-full" />
            ) : (
              <BloodPressureChart data={metrics || []} />
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
