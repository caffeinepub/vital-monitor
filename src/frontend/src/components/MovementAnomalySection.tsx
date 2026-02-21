import { useMovementAnomalies } from '../hooks/useMovementAnomalies';
import { AnomalyListItem } from './AnomalyListItem';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Skeleton } from './ui/skeleton';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';

export function MovementAnomalySection() {
  const { data: anomalies, isLoading, error } = useMovementAnomalies();

  if (isLoading) {
    return (
      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-semibold text-health-text-primary mb-1">Movement Anomalies</h2>
          <p className="text-sm text-health-text-secondary">Detected unusual movement patterns</p>
        </div>
        <Skeleton className="h-64 rounded-xl" />
      </section>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Failed to load movement anomalies. Please try again.
        </AlertDescription>
      </Alert>
    );
  }

  const sortedAnomalies = anomalies ? [...anomalies].sort((a, b) => Number(b.timestamp - a.timestamp)) : [];
  const recentAnomalies = sortedAnomalies.filter(a => {
    const oneHourAgo = BigInt(Date.now()) * BigInt(1000000) - BigInt(3600000000000);
    return a.timestamp >= oneHourAgo;
  });

  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-2xl font-semibold text-health-text-primary mb-1">Movement Anomalies</h2>
        <p className="text-sm text-health-text-secondary">Detected unusual movement patterns</p>
      </div>

      <Card className="border-health-border bg-white shadow-health">
        <CardHeader>
          <div className="flex items-center gap-2">
            <img 
              src="/assets/generated/movement-icon.dim_128x128.png" 
              alt="Movement" 
              className="w-6 h-6"
            />
            <CardTitle className="text-lg">Recent Activity</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          {sortedAnomalies.length === 0 ? (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                No movement anomalies detected. Your movement patterns appear normal.
              </AlertDescription>
            </Alert>
          ) : (
            <div className="space-y-3">
              {sortedAnomalies.map((anomaly, index) => (
                <AnomalyListItem 
                  key={index} 
                  anomaly={anomaly} 
                  isRecent={recentAnomalies.includes(anomaly)}
                />
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
