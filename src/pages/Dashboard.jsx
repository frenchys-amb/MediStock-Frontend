import React, { useState, useEffect } from 'react';

const Dashboard = () => {
  const [welcomeMessage, setWelcomeMessage] = useState('');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) {
      setWelcomeMessage('Good morning, ');
    } else if (hour < 18) {
      setWelcomeMessage('Good afternoon, ');
    } else {
      setWelcomeMessage('Good evening, ');
    }
  }, []);

  return (
    <div>
      <header className="bg-sky-900 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-semibold">Dashboard</h1>
          <div className="flex items-center space-x-4">
          </div>
        </div>
      </header>

      <main className="container mx-auto p-6">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">{welcomeMessage}Administrator</h2>
          <p className="text-black">Here is a summary of your activity:</p>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-sky-900 p-4 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2 text-white">Storage</h3>
              <p className="text-white">You have 5 upcoming Storage</p>
            </div>
            <div className="bg-sky-900 p-4 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2 text-white">Medication</h3>
              <p className="text-white">You have 3 Medication</p>
            </div>
            <div className="bg-sky-900 p-4 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2 text-white">Employee</h3>
              <p className="text-white">You have 2 new Record</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
