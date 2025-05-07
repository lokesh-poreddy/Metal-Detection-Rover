'use client';

import React, { useState, useEffect } from 'react';
import { Battery, Signal, AlertTriangle } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { 
  AlertDialog, 
  AlertDialogContent, 
  AlertDialogHeader, 
  AlertDialogTitle, 
  AlertDialogDescription 
} from '../../components/ui/alert-dialog';

interface RoverControlProps {
  onCommand: (direction: string) => Promise<void>;
  isConnected: boolean;
}

export default function RoverControls() {
  return (
    <div className="bg-zinc-900 rounded-xl p-5">
      <h2 className="text-xl font-semibold text-white mb-5">Rover Controls</h2>
      <div className="space-y-4">
        <Button 
          variant="outline"
          className="w-full bg-white text-black hover:bg-gray-100"
          onClick={() => console.log('Forward')}
        >
          ↑ Move Forward
        </Button>
        <Button 
          variant="outline"
          className="w-full bg-white text-black hover:bg-gray-100"
          onClick={() => console.log('Backward')}
        >
          ↓ Move Backward
        </Button>
      </div>
    </div>
  );
}