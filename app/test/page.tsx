'use client';

import { Badge } from '@/components/ui/badge';
import { Toast, ToastProvider, ToastViewport } from '@/components/ui/toast';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useState } from 'react';

export default function TestComponents() {
  const [activeTab, setActiveTab] = useState('badges');

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Component Test Page</h1>
      
      <Tabs defaultValue="badges" className="w-full">
        <TabsList>
          <TabsTrigger value="badges">Badges</TabsTrigger>
          <TabsTrigger value="toast">Toast</TabsTrigger>
        </TabsList>

        <TabsContent value="badges">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Badge Variants</h2>
            <div className="flex gap-4">
              <Badge>Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="destructive">Destructive</Badge>
              <Badge variant="outline">Outline</Badge>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="toast">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Toast Examples</h2>
            <ToastProvider>
              <Toast>
                <div className="grid gap-1">
                  <div className="font-medium">Toast Title</div>
                  <div className="text-sm text-gray-500">Toast message here</div>
                </div>
              </Toast>
              <ToastViewport />
            </ToastProvider>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}