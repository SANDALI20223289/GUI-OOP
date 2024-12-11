import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import axios from 'axios';

const socket = io('http://localhost:3000');

function AddAndRemove() {
  const [message, setMessage] = useState('');
  const [customerId, setCustomerId] = useState('');
  const [priority, setPriority] = useState('2');
  const [vendors, setVendors] = useState([]);
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/vendors');
        setVendors(response.data || []);
      } catch (error) {
        console.error('Error fetching vendors:', error);
        setVendors([]);
      }
    };

    fetchVendors();
  }, []);

  const handleAddVendor = async () => {
    try {
      const newVendor = {
        id: `vendor${vendors.length + 1}`,
        name: `Vendor ${vendors.length + 1}`,
      };
      const response = await axios.post('http://localhost:3000/api/vendors/add', newVendor);
      setVendors([...vendors, response.data.vendor]);
      setMessage('Vendor added successfully!');
    } catch (error) {
      setMessage('Error adding vendor.');
      console.error(error);
    }
  };

  const handleRemoveVendor = async (vendorId) => {
    try {
      await axios.post('http://localhost:3000/api/vendors/remove', { id: vendorId });
      setVendors(vendors.filter((vendor) => vendor.id !== vendorId));
      setMessage('Vendor removed successfully.');
    } catch (error) {
      setMessage('Error removing vendor.');
      console.error(error);
    }
  };

  const handleAddCustomer = async (e) => {
    e.preventDefault();
    try {
      const newCustomer = { id: customerId, priority: parseInt(priority, 10) };
      const response = await axios.post('http://localhost:3000/api/customers/add', newCustomer);
      setCustomers([...customers, newCustomer]);
      setMessage('Customer added successfully!');
      setCustomerId('');
    } catch (error) {
      setMessage('Error adding customer.');
      console.error(error);
    }
  };

  const handleRemoveCustomer = async (customerId) => {
    try {
      await axios.post('http://localhost:3000/api/customers/remove', { id: customerId });
      setCustomers(customers.filter((customer) => customer.id !== customerId));
      setMessage('Customer removed successfully.');
    } catch (error) {
      setMessage('Error removing customer.');
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 p-6">
      <div className="max-w-6xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-blue-800 mb-6 text-center">
          Vendor & Customer Management
        </h1>
        {message && (
          <div className="bg-blue-100 border border-blue-300 text-blue-800 text-center py-2 rounded-lg mb-6">
            {message}
          </div>
        )}

        <div className="space-y-12">
          {/* Vendor Management */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Manage Vendors</h2>
            <div className="flex justify-center mb-6">
              <button
                onClick={handleAddVendor}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
              >
                Add Vendor
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {vendors.length > 0 ? (
                vendors.map((vendor) => (
                  <div key={vendor.id} className="bg-gray-100 p-4 rounded-lg shadow">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{vendor.name}</h3>
                    <p className="text-sm text-gray-600">ID: {vendor.id}</p>
                    <button
                      onClick={() => handleRemoveVendor(vendor.id)}
                      className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
                    >
                      Remove
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No vendors available.</p>
              )}
            </div>
          </section>

          {/* Customer Management */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Manage Customers</h2>
            <form onSubmit={handleAddCustomer} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Customer ID
                  </label>
                  <input
                    type="text"
                    value={customerId}
                    onChange={(e) => setCustomerId(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Priority</label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300"
                  >
                    <option value="1">1 (Regular)</option>
                    <option value="2">2 (Priority)</option>
                  </select>
                </div>
              </div>
              <button
                type="submit"
                className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
              >
                Add Customer
              </button>
            </form>

            <h3 className="text-lg font-semibold text-gray-700 mt-6">Customer List</h3>
            <ul className="divide-y divide-gray-300">
              {customers.length > 0 ? (
                customers.map((customer) => (
                  <li
                    key={customer.id}
                    className="py-3 flex justify-between items-center text-gray-700"
                  >
                    <span>
                      ID: {customer.id} (Priority: {customer.priority})
                    </span>
                    <button
                      onClick={() => handleRemoveCustomer(customer.id)}
                      className="bg-red-500 text-white px-4 py-1 rounded-lg hover:bg-red-600"
                    >
                      Remove
                    </button>
                  </li>
                ))
              ) : (
                <li className="text-gray-500">No customers available.</li>
              )}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}

export default AddAndRemove;
