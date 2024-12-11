import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';

function Analytics() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const socket = io('http://localhost:3000');
    let timePoints = [];

    const addDataPoint = (available) => {
      const now = new Date();
      timePoints.push({
        time: now.toLocaleTimeString(),
        available
      });

      // Keep last 20 points
      if (timePoints.length > 20) {
        timePoints = timePoints.slice(-20);
      }

      setData([...timePoints]);
    };

    socket.on('ticketsAdded', (data) => addDataPoint(data.available));
    socket.on('ticketPurchased', (data) => addDataPoint(data.available));

    return () => socket.disconnect();
  }, []);

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg mb-8 max-w-4xl mx-auto">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
        Real-time Ticket Analytics
      </h2>

      {/* Chart Container */}
      <div className="mb-6">
        <div className="flex justify-center">
          <LineChart width={700} height={400} data={data} className="shadow-xl rounded-lg">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="available" 
              stroke="#FF0000" 
              name="Available Tickets"
              dot={false} // Remove dots to clean up the chart
            />
          </LineChart>
        </div>
      </div>

      

      
    </div>
  );
}

export default Analytics;
