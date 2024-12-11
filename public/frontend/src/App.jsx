import React, { useState } from 'react';
import ConfigurationForm from './components/ConfigurationForm';
import TicketDisplay from './components/TicketDisplay';
import ControlPanel from './components/ControlPanel';
import Analytics from './components/Analytics';
import Customer from './components/Customer';
import AddAndRemove from './components/AddAndRemove';

function App() {
  const [isRunning, setIsRunning] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-50 to-blue-50 py-10">
      <div className="max-w-7xl mx-auto px-6">
        {/* Page Header */}
        <header className="text-center mb-12">
          <h1 className="text-6xl font-bold text-blue-600 tracking-wider drop-shadow-sm">
            Ticket Management System
          </h1>
          <p className="text-gray-500 text-lg mt-4">
            Streamline Your Operations with Real-Time Insights
          </p>
        </header>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          {/* Left Column */}
          <div className="xl:col-span-7 space-y-8">
            {/* Analytics Section */}
            <section className="bg-white p-8 rounded-xl shadow-md">
              <h2 className="text-3xl font-semibold text-gray-800 mb-6">
                Analytics
              </h2>
              <Analytics />
            </section>

            {/* Add and Remove Tickets Section */}
            <section className="bg-purple-50 p-8 rounded-xl shadow-md">
              <h2 className="text-3xl font-semibold text-gray-800 mb-6">
                Add and Remove Tickets
              </h2>
              <AddAndRemove />
            </section>
          </div>

          {/* Right Column */}
          <div className="xl:col-span-5 space-y-8">
            {/* Configuration Section */}
            <section className="bg-white p-8 rounded-xl shadow-md">
              <h2 className="text-3xl font-semibold text-gray-800 mb-6">
                Configuration
              </h2>
              <ConfigurationForm disabled={isRunning} />
            </section>

            {/* Control Panel Section */}
            <section className="bg-gradient-to-b from-blue-50 to-blue-100 p-8 rounded-xl shadow-md">
              <ControlPanel
                isRunning={isRunning}
                onToggle={(running) => setIsRunning(running)}
              />
            </section>

            {/* Ticket Status Section */}
            <section className="bg-white p-8 rounded-xl shadow-md">
              <h2 className="text-3xl font-semibold text-gray-800 mb-6">
                Ticket Status
              </h2>
              <TicketDisplay />
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
