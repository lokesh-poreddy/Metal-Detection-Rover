'use client';

import React, { useState, useEffect } from 'react';
import { thinkVApi } from '../services/api';

interface RoverData {
  movement: string;
  sensorData: string;
  detection: string;
}

const UpdateRoverData = () => {
  const [roverData, setRoverData] = useState<RoverData>({
    movement: '0',
    sensorData: '0',
    detection: '0',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRoverData = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await thinkVApi.readData();
      if (response.success) {
        setRoverData({
          movement: response.data?.movement || '0',
          sensorData: response.data?.sensor_data || '0',
          detection: response.data?.detection || '0',
        });
      } else {
        setError(response.message || 'An unknown error occurred');
      }
    } catch (error) {
      setError('Failed to fetch rover data');
      console.error('Error fetching rover data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Auto-refresh data every 5 seconds
  useEffect(() => {
    const interval = setInterval(fetchRoverData, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-4 bg-zinc-800 rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Rover Status</h2>
        <button 
          onClick={fetchRoverData}
          disabled={isLoading}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {isLoading ? 'Updating...' : 'Update Data'}
        </button>
      </div>
      
      {error && (
        <div className="text-red-500 mb-4">
          {error}
        </div>
      )}

      <div className="space-y-2">
        <div className="flex justify-between items-center p-2 bg-zinc-700 rounded">
          <span className="text-gray-300">Rover Movement:</span>
          <span className="font-mono">{roverData.movement}</span>
        </div>
        <div className="flex justify-between items-center p-2 bg-zinc-700 rounded">
          <span className="text-gray-300">Sensor Data:</span>
          <span className="font-mono">{roverData.sensorData}</span>
        </div>
        <div className="flex justify-between items-center p-2 bg-zinc-700 rounded">
          <span className="text-gray-300">Detection:</span>
          <span className="font-mono">{roverData.detection}</span>
        </div>
      </div>
    </div>
  );
};

export default UpdateRoverData;