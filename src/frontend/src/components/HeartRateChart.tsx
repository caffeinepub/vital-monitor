import { HealthMetric } from '../backend';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { formatChartTimestamp } from '../utils/timeUtils';

interface HeartRateChartProps {
  data: HealthMetric[];
}

export function HeartRateChart({ data }: HeartRateChartProps) {
  const chartData = data.map(metric => ({
    timestamp: Number(metric.timestamp),
    bpm: Number(metric.heartRate),
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
          domain={[40, 140]}
        />
        <Tooltip 
          contentStyle={{ 
            backgroundColor: 'white', 
            border: '1px solid oklch(0.922 0 0)',
            borderRadius: '8px'
          }}
          labelStyle={{ color: 'oklch(0.145 0 0)' }}
        />
        <ReferenceLine y={60} stroke="oklch(0.828 0.189 84.429 / 0.3)" strokeDasharray="3 3" />
        <ReferenceLine y={100} stroke="oklch(0.828 0.189 84.429 / 0.3)" strokeDasharray="3 3" />
        <Line 
          type="monotone" 
          dataKey="bpm" 
          stroke="oklch(0.646 0.222 41.116)" 
          strokeWidth={2}
          dot={{ fill: 'oklch(0.646 0.222 41.116)', r: 4 }}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
