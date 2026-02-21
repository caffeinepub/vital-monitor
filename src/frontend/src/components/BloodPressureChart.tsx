import { HealthMetric } from '../backend';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ReferenceLine } from 'recharts';
import { formatChartTimestamp } from '../utils/timeUtils';

interface BloodPressureChartProps {
  data: HealthMetric[];
}

export function BloodPressureChart({ data }: BloodPressureChartProps) {
  const chartData = data.map(metric => ({
    timestamp: Number(metric.timestamp),
    systolic: Number(metric.bloodPressure.systolic),
    diastolic: Number(metric.bloodPressure.diastolic),
    label: formatChartTimestamp(metric.timestamp)
  }));

  if (chartData.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center text-health-text-secondary">
        No data available for the selected period
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.922 0 0)" />
        <XAxis 
          dataKey="label" 
          stroke="oklch(0.556 0 0)"
          style={{ fontSize: '12px' }}
        />
        <YAxis 
          stroke="oklch(0.556 0 0)"
          style={{ fontSize: '12px' }}
          domain={[60, 160]}
        />
        <Tooltip 
          contentStyle={{ 
            backgroundColor: 'white', 
            border: '1px solid oklch(0.922 0 0)',
            borderRadius: '8px'
          }}
          labelStyle={{ color: 'oklch(0.145 0 0)' }}
        />
        <Legend 
          wrapperStyle={{ fontSize: '12px' }}
          iconType="line"
        />
        <ReferenceLine y={120} stroke="oklch(0.828 0.189 84.429 / 0.3)" strokeDasharray="3 3" />
        <ReferenceLine y={80} stroke="oklch(0.828 0.189 84.429 / 0.3)" strokeDasharray="3 3" />
        <Line 
          type="monotone" 
          dataKey="systolic" 
          stroke="oklch(0.6 0.118 184.704)" 
          strokeWidth={2}
          dot={{ fill: 'oklch(0.6 0.118 184.704)', r: 4 }}
          name="Systolic"
        />
        <Line 
          type="monotone" 
          dataKey="diastolic" 
          stroke="oklch(0.398 0.07 227.392)" 
          strokeWidth={2}
          dot={{ fill: 'oklch(0.398 0.07 227.392)', r: 4 }}
          name="Diastolic"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
