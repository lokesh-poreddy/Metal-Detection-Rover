'use client';

import { useState } from 'react';
import { Tab } from '@headlessui/react';

export default function ControlPanel() {
  const [mode, setMode] = useState('manual');

  return (
    <div className="bg-zinc-900 rounded-xl p-5">
      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl bg-zinc-800 p-1">
          <Tab
            className={({ selected }) =>
              `w-full rounded-lg py-2.5 text-sm font-medium leading-5
              ${selected 
                ? 'bg-white text-zinc-900 shadow'
                : 'text-gray-400 hover:bg-zinc-700/30 hover:text-white'
              }`
            }
          >
            Manual Control
          </Tab>
          <Tab
            className={({ selected }) =>
              `w-full rounded-lg py-2.5 text-sm font-medium leading-5
              ${selected 
                ? 'bg-white text-zinc-900 shadow'
                : 'text-gray-400 hover:bg-zinc-700/30 hover:text-white'
              }`
            }
          >
            Auto Mode
          </Tab>
        </Tab.List>
        <Tab.Panels className="mt-4">
          <Tab.Panel className="space-y-4">
            <div className="grid grid-cols-3 gap-2">
              <button className="col-start-2 bg-white text-black py-3 rounded-md hover:bg-gray-100">
                ↑ Forward
              </button>
              <button className="bg-white text-black py-3 rounded-md hover:bg-gray-100">
                ← Left
              </button>
              <button className="bg-white text-black py-3 rounded-md hover:bg-gray-100">
                ↓ Back
              </button>
              <button className="bg-white text-black py-3 rounded-md hover:bg-gray-100">
                → Right
              </button>
            </div>
            <button className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600">
              Emergency Stop
            </button>
          </Tab.Panel>
          <Tab.Panel>
            <div className="space-y-4">
              <div className="flex items-center justify-between bg-zinc-800 p-3 rounded-lg">
                <span className="text-white">Auto Navigation</span>
                <button className="bg-green-500 text-white px-4 py-1 rounded-md hover:bg-green-600">
                  Start
                </button>
              </div>
              <div className="bg-zinc-800 p-3 rounded-lg">
                <div className="text-white mb-2">Scan Area</div>
                <input 
                  type="range" 
                  className="w-full"
                  min="1"
                  max="10"
                  step="1"
                />
              </div>
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}