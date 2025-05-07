interface RoverControlsProps {
  connectionStatus: string;
  handleRoverControl: (direction: string) => void;
  handleEmergencyStop: () => void;
}

export function RoverControls({ 
  connectionStatus, 
  handleRoverControl, 
  handleEmergencyStop 
}: RoverControlsProps) {
  return (
    <div className="control-panel">
      <h2 className="text-2xl font-bold mb-4">Rover Controls</h2>
      <div className="control-buttons-container">
        <button 
          className="control-button"
          onClick={() => handleRoverControl('FORWARD')}
          disabled={connectionStatus !== 'connected'}
        >
          ↑ Move Forward
        </button>
        <button 
          className="control-button"
          onClick={() => handleRoverControl('BACKWARD')}
          disabled={connectionStatus !== 'connected'}
        >
          ↓ Move Backward
        </button>
        <button 
          className="control-button"
          onClick={handleEmergencyStop}
          disabled={connectionStatus !== 'connected'}
        >
          Emergency Stop
        </button>
      </div>
    </div>
  );
}