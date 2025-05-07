'use client';

import { useState } from 'react';
import { AreaChart, Card, Title, BarChart } from '@tremor/react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from './ui/badge';

interface DetectionData {
  date: string;
  "Metal Detection": number;
  "Distance": number;
  "Signal Strength": number;
  "Metal Type"?: string;
}

const mockData: DetectionData[] = [
  {
    date: "Jan 22",
    "Metal Detection": 2,
    "Distance": 45,
    "Signal Strength": 75,
    "Metal Type": "Ferrous"
  },
  {
    date: "Jan 23",
    "Metal Detection": 3,
    "Distance": 30,
    "Signal Strength": 85,
    "Metal Type": "Non-Ferrous"
  },
  {
    date: "Jan 24",
    "Metal Detection": 4,
    "Distance": 25,
    "Signal Strength": 90,
    "Metal Type": "Ferrous"
  }
];

export default function MetalDetectionMap() {
  const [data, setData] = useState<DetectionData[]>(mockData);

  return (
    <Card className="bg-zinc-900 p-6">
      <div className="flex items-center justify-between mb-6">
        <Title className="text-white text-xl font-semibold">Metal Detection History</Title>
        <Badge variant="outline" className="bg-zinc-800 text-white">
          Last 24 hours
        </Badge>
      </div>

      <Tabs defaultValue="area" className="mt-4">
        <TabsList>
          <TabsTrigger value="area" className="text-white">Area Chart</TabsTrigger>
          <TabsTrigger value="bar" className="text-white">Bar Chart</TabsTrigger>
          <TabsTrigger value="stats" className="text-white">Statistics</TabsTrigger>
        </TabsList>

        <TabsContent value="area">
          <AreaChart
            className="h-72 mt-4"
            data={data}
            index="date"
            categories={["Metal Detection", "Distance", "Signal Strength"]}
            colors={["rose", "indigo", "amber"]}
            valueFormatter={(number: number) =>
              `${Intl.NumberFormat("us").format(number).toString()}`
            }
            showLegend
            showGridLines
            showAnimation
          />
        </TabsContent>

        <TabsContent value="bar">
          <BarChart
            className="h-72 mt-4"
            data={data}
            index="date"
            categories={["Metal Detection"]}
            colors={["rose"]}
            valueFormatter={(number: number) =>
              `${number} detections`
            }
            showLegend
            showGridLines
          />
        </TabsContent>

        <TabsContent value="stats">
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="bg-zinc-800 p-4 rounded-lg">
              <h3 className="text-gray-400 text-sm">Total Detections</h3>
              <p className="text-white text-2xl font-bold mt-2">
                {data.reduce((acc, curr) => acc + curr["Metal Detection"], 0)}
              </p>
            </div>
            <div className="bg-zinc-800 p-4 rounded-lg">
              <h3 className="text-gray-400 text-sm">Average Distance</h3>
              <p className="text-white text-2xl font-bold mt-2">
                {Math.round(data.reduce((acc, curr) => acc + curr.Distance, 0) / data.length)}cm
              </p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
}