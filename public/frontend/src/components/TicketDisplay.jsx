import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

function TicketDisplay() {
  const [availableTickets, setAvailableTickets] = useState(0);
  const [ticketsSold, setTicketsSold] = useState(0);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const socket = io('http://localhost:3000');

    socket.on('ticketsAdded', (data) => {
      setAvailableTickets(data.available);
      setTransactions((prev) =>
        [
          {
            type: 'added',
            count: data.count,
            timestamp: new Date(),
          },
          ...prev,
        ].slice(0, 10)
      );
    });

    socket.on('ticketPurchased', (data) => {
      setAvailableTickets(data.available);
      setTicketsSold((prev) => prev + 1);
      setTransactions((prev) =>
        [
          {
            type: 'purchased',
            ticket: data.ticket,
            timestamp: new Date(),
          },
          ...prev,
        ].slice(0, 10)
      );
    });

    return () => socket.disconnect();
  }, []);

  return (
    <div className="bg-gray-100 p-8 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-blue-700">Ticket Dashboard</h2>

      {/* Ticket Stats */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="bg-blue-50 p-6 rounded-lg shadow-md text-center border border-blue-200">
          <div className="text-5xl font-extrabold text-blue-600">
            {availableTickets}
          </div>
          <div className="text-gray-700 mt-2 text-lg">Available Tickets</div>
        </div>
        <div className="bg-orange-50 p-6 rounded-lg shadow-md text-center border border-orange-200">
          <div className="text-5xl font-extrabold text-orange-600">
            {ticketsSold}
          </div>
          <div className="text-gray-700 mt-2 text-lg">Tickets Sold</div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div>
        <h3 className="text-2xl font-semibold mb-4 text-gray-800">Recent Transactions</h3>
        <div className="space-y-4">
          {transactions.length > 0 ? (
            transactions.map((transaction, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg shadow-md transition-all ${
                  transaction.type === 'added'
                    ? 'bg-green-50 border-l-4 border-green-400'
                    : 'bg-blue-50 border-l-4 border-blue-400'
                }`}
              >
                <div className="font-semibold text-gray-800">
                  {transaction.type === 'added'
                    ? `Added ${transaction.count} tickets`
                    : `Ticket ${transaction.ticket?.id || 'N/A'} purchased`}
                </div>
                <div className="text-sm text-gray-600">
                  {new Date(transaction.timestamp).toLocaleTimeString()}
                </div>
              </div>
            ))
          ) : (
            <div className="text-gray-500 text-center">No recent transactions available.</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TicketDisplay;
