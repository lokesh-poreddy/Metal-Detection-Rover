import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Battery } from 'lucide-react';

interface SensorDataProps {
  batteryLevel: number | null;
}

export function SensorData({ batteryLevel }: SensorDataProps) {
  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Sensor Data
          <span className="animate-pulse text-cyan-500">⚡</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-400">Battery Level</span>
            <div className="flex items-center gap-2">
              <Battery className="h-4 w-4 text-green-500" />
              <span className="font-medium">{batteryLevel ?? '--'}%</span>
            </div>
          </div>
          {/* Add more sensor data displays here */}
        </div>
      </CardContent>
    </Card>
  );
}