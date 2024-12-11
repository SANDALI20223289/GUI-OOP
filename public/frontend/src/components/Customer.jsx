import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import axios from 'axios';

const socket = io('http://localhost:3000');

function Customer() {
  const [customerId, setCustomerId] = useState('');
  const [priority, setPriority] = useState('2');
  const [message, setMessage] = useState('');
  const [tickets, setTickets] = useState([]);
  const [isAddingRegularCustomers, setIsAddingRegularCustomers] = useState(false);
  const [regularCustomerId, setRegularCustomerId] = useState(1);
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    socket.on('ticketPurchased', (data) => {
      setTickets((prevTickets) => [data, ...prevTickets]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleAddPriorityCustomer = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/customers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: customerId, priority: parseInt(priority) }),
      });

      const result = await response.json();
      if (result.success) {
        setMessage(`Priority Customer ${customerId} added successfully!`);
        setCustomerId('');
      } else {
        setMessage('Failed to add priority customer.');
      }
    } catch (error) {
      setMessage('Error connecting to the server.');
      console.error(error);
    }
  };

  const addRegularCustomer = async () => {
    const id = `regular-customer-${regularCustomerId}`;
    setRegularCustomerId((prevId) => prevId + 1);
    try {
      const response = await axios.post('http://localhost:3000/api/customers', {
        id,
        priority: 1,
      });
      if (!response.data.success) {
        console.error(`Failed to add Regular Customer ${id}: ${response.data.message}`);
      }
    } catch (error) {
      console.error('Error adding regular customer:', error.response?.data || error.message);
    }
  };

  const handleToggleRegularCustomers = () => {
    setIsAddingRegularCustomers((prevState) => {
      const newState = !prevState;
      if (newState) {
        const newIntervalId = setInterval(() => {
          addRegularCustomer();
        }, 1000);
        setIntervalId(newIntervalId);
      } else {
        clearInterval(intervalId);
        setIntervalId(null);
      }
      return newState;
    });
  };

  return (
    <div className="bg-gradient-to-r from-teal-400 via-blue-500 to-purple-600 min-h-screen py-10">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">Customer Management</h1>

        {/* Add Priority Customer */}
        <form onSubmit={handleAddPriorityCustomer} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="customerId" className="block text-sm font-medium text-gray-600">
                Customer ID
              </label>
              <input
                id="customerId"
                type="text"
                value={customerId}
                onChange={(e) => setCustomerId(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label htmlFor="priority" className="block text-sm font-medium text-gray-600">
                Priority
              </label>
              <select
                id="priority"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="1">1 (Regular)</option>
                <option value="2">2 (Priority)</option>
              </select>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
          >
            Add Priority Customer
          </button>
        </form>

        {message && <p className="mt-4 text-green-600 text-center">{message}</p>}

        {/* Regular Customers */}
        <div className="mt-8 text-center">
          <button
            onClick={handleToggleRegularCustomers}
            className={`px-6 py-3 rounded-lg font-medium text-white ${
              isAddingRegularCustomers ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
            }`}
          >
            {isAddingRegularCustomers ? 'Stop Adding Regular Customers' : 'Start Adding Regular Customers'}
          </button>
        </div>

        {/* Ticket Purchases */}
        <h2 className="text-2xl font-semibold mt-10 text-gray-700">Ticket Purchases</h2>
        <ul className="space-y-4 mt-4">
          {tickets.map((ticket, index) => (
            <li
              key={index}
              className="bg-gray-100 p-4 rounded-lg shadow-md flex justify-between items-center"
            >
              <span className="font-medium text-gray-800">Customer: {ticket.customerId}</span>
              <span className="text-gray-600 text-sm">
                Priority: {ticket.priority}, Ticket: {ticket.ticket}, Available: {ticket.available}
              </span>
            </li>
          ))}
          {tickets.length === 0 && <p className="text-gray-500 text-center">No ticket purchases yet.</p>}
        </ul>
      </div>
    </div>
  );
}

export default Customer;
