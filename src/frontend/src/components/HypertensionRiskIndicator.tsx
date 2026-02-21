import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { AlertTriangle, CheckCircle2 } from 'lucide-react';
import { Alert, AlertDescription } from './ui/alert';

interface HypertensionRiskIndicatorProps {
  risk: boolean;
}

export function HypertensionRiskIndicator({ risk }: HypertensionRiskIndicatorProps) {
  return (
    <Card className="border-health-border bg-white shadow-health hover:shadow-health-lg transition-shadow">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-medium text-health-text-secondary">
          Hypertension Risk
        </CardTitle>
      </CardHeader>
      <CardContent>
        {risk ? (
          <Alert variant="destructive" className="border-health-critical/20 bg-health-critical/5">
            <AlertTriangle className="h-5 w-5" />
            <AlertDescription className="ml-2">
              <div className="font-semibold mb-1">Risk Detected</div>
              <div className="text-sm">Your readings indicate potential hypertension risk. Please consult with your healthcare provider.</div>
            </AlertDescription>
          </Alert>
        ) : (
          <Alert className="border-health-normal/20 bg-health-normal/5">
            <CheckCircle2 className="h-5 w-5 text-health-normal" />
            <AlertDescription className="ml-2">
              <div className="font-semibold mb-1 text-health-normal">No Risk Detected</div>
              <div className="text-sm text-health-text-secondary">Your blood pressure readings are within normal range.</div>
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}
