import { HeartRateCard } from './HeartRateCard';
import { BloodPressureCard } from './BloodPressureCard';
import { HypertensionRiskIndicator } from './HypertensionRiskIndicator';
import { useHealthMetrics } from '../hooks/useHealthMetrics';
import { Skeleton } from './ui/skeleton';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';

export function HealthDashboard() {
  const { data: metrics, isLoading, error } = useHealthMetrics();

  if (isLoading) {
    return (
      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-semibold text-health-text-primary mb-1">Current Vitals</h2>
          <p className="text-sm text-health-text-secondary">Real-time health metrics from your device</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Skeleton className="h-48 rounded-xl" />
          <Skeleton className="h-48 rounded-xl" />
          <Skeleton className="h-48 rounded-xl" />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Failed to load health metrics. Please try again.
        </AlertDescription>
      </Alert>
    );
  }

  const latestMetric = metrics && metrics.length > 0 ? metrics[metrics.length - 1] : null;

  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-2xl font-semibold text-health-text-primary mb-1">Current Vitals</h2>
        <p className="text-sm text-health-text-secondary">Real-time health metrics from your device</p>
      </div>
      
      {latestMetric ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <HeartRateCard heartRate={Number(latestMetric.heartRate)} timestamp={latestMetric.timestamp} />
            <BloodPressureCard 
              systolic={Number(latestMetric.bloodPressure.systolic)} 
              diastolic={Number(latestMetric.bloodPressure.diastolic)}
              timestamp={latestMetric.timestamp}
            />
            <HypertensionRiskIndicator risk={latestMetric.hypertensionRisk} />
          </div>
        </>
      ) : (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>No Data Available</AlertTitle>
          <AlertDescription>
            No health metrics have been recorded yet. Connect your device to start monitoring.
          </AlertDescription>
        </Alert>
      )}
    </section>
  );
}
