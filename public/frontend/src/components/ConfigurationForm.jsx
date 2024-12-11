import React, { useState } from 'react';
import axios from 'axios';

function ConfigurationForm({ disabled }) {
  const [config, setConfig] = useState({
    totalTickets: 1000,
    ticketReleaseRate: 5,
    customerRetrievalRate: 3,
    maxTicketCapacity: 100,
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    const newErrors = {};

    if (config.totalTickets < 1 || config.totalTickets > 1000) {
      newErrors.totalTickets = "Total tickets must be between 1 and 1000.";
    }
    if (config.ticketReleaseRate < 1 || config.ticketReleaseRate > 100) {
      newErrors.ticketReleaseRate = "Release rate must be between 1 and 100.";
    }
    if (config.customerRetrievalRate < 1 || config.customerRetrievalRate > 100) {
      newErrors.customerRetrievalRate = "Retrieval rate must be between 1 and 100.";
    }
    if (config.maxTicketCapacity < 1 || config.maxTicketCapacity > config.totalTickets) {
      newErrors.maxTicketCapacity = "Max capacity must be between 1 and the total tickets.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setIsLoading(true);
    try {
      await axios.post('http://localhost:3000/api/config', config);
      alert('Configuration saved successfully!');
    } catch (error) {
      alert('Error saving configuration');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-teal-400 to-purple-600 p-8 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-white mb-6">System Configuration</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Total Tickets */}
          <div>
            <label className="block text-sm font-medium text-white mb-1">
              Total Tickets
            </label>
            <input
              type="number"
              value={config.totalTickets}
              onChange={(e) =>
                setConfig({ ...config, totalTickets: parseInt(e.target.value) || '' })
              }
              className={`block w-full px-3 py-2 rounded-md border shadow-sm focus:ring-purple-500 focus:border-purple-500 ${
                errors.totalTickets ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter total tickets (1-1000)"
              disabled={disabled || isLoading}
            />
            {errors.totalTickets && (
              <p className="text-sm text-red-500 mt-1">{errors.totalTickets}</p>
            )}
          </div>

          {/* Ticket Release Rate */}
          <div>
            <label className="block text-sm font-medium text-white mb-1">
              Ticket Release Rate (per second)
            </label>
            <input
              type="number"
              value={config.ticketReleaseRate}
              onChange={(e) =>
                setConfig({ ...config, ticketReleaseRate: parseInt(e.target.value) || '' })
              }
              className={`block w-full px-3 py-2 rounded-md border shadow-sm focus:ring-purple-500 focus:border-purple-500 ${
                errors.ticketReleaseRate ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter release rate (1-100)"
              disabled={disabled || isLoading}
            />
            {errors.ticketReleaseRate && (
              <p className="text-sm text-red-500 mt-1">{errors.ticketReleaseRate}</p>
            )}
          </div>

          {/* Customer Retrieval Rate */}
          <div>
            <label className="block text-sm font-medium text-white mb-1">
              Customer Retrieval Rate (per second)
            </label>
            <input
              type="number"
              value={config.customerRetrievalRate}
              onChange={(e) =>
                setConfig({ ...config, customerRetrievalRate: parseInt(e.target.value) || '' })
              }
              className={`block w-full px-3 py-2 rounded-md border shadow-sm focus:ring-purple-500 focus:border-purple-500 ${
                errors.customerRetrievalRate ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter retrieval rate (1-100)"
              disabled={disabled || isLoading}
            />
            {errors.customerRetrievalRate && (
              <p className="text-sm text-red-500 mt-1">{errors.customerRetrievalRate}</p>
            )}
          </div>

          {/* Maximum Ticket Capacity */}
          <div>
            <label className="block text-sm font-medium text-white mb-1">
              Maximum Ticket Capacity
            </label>
            <input
              type="number"
              value={config.maxTicketCapacity}
              onChange={(e) =>
                setConfig({ ...config, maxTicketCapacity: parseInt(e.target.value) || '' })
              }
              className={`block w-full px-3 py-2 rounded-md border shadow-sm focus:ring-purple-500 focus:border-purple-500 ${
                errors.maxTicketCapacity ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder={`Enter max capacity (1-${config.totalTickets})`}
              disabled={disabled || isLoading}
            />
            {errors.maxTicketCapacity && (
              <p className="text-sm text-red-500 mt-1">{errors.maxTicketCapacity}</p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className={`bg-purple-700 text-white px-6 py-2 rounded-md font-medium hover:bg-purple-800 transition ${
              isLoading ? 'opacity-70 cursor-not-allowed' : ''
            }`}
            disabled={disabled || isLoading}
          >
            {isLoading ? 'Saving...' : 'Save Configuration'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ConfigurationForm;
