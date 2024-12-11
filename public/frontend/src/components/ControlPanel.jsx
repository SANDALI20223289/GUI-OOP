import React from 'react';
import axios from 'axios';

function ControlPanel({ isRunning, onToggle }) {
  const handleToggle = async () => {
    try {
      if (!isRunning) {
        await axios.post('http://localhost:3000/api/system/start');
        onToggle(true);
      } else {
        await axios.post('http://localhost:3000/api/system/stop');
        onToggle(false);
      }
    } catch (error) {
      alert('Error toggling system state');
    }
  };

  return (
    <div className="bg-gray-50 p-8 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        System Control
      </h2>
      <div className="flex flex-col items-center justify-center space-y-6">
        <p className={`text-lg font-medium ${isRunning ? 'text-green-700' : 'text-red-700'}`}>
          {isRunning ? 'The system is currently running.' : 'The system is stopped.'}
        </p>

        <button
          onClick={handleToggle}
          className={`w-48 px-6 py-3 rounded-md text-white font-semibold shadow-lg transition-transform transform hover:scale-105 ${
            isRunning
              ? 'bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-400'
              : 'bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-400'
          }`}
        >
          {isRunning ? 'Stop System' : 'Start System'}
        </button>
      </div>
    </div>
  );
}

export default ControlPanel;
