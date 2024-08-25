import React from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

function UnitComponent() {
  axios.defaults.headers.common['Authorization'] = `Token ${Cookies.get('token')}`;

  return (
    <div>
    <header className="bg-sky-900 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-semibold">Unit Managements</h1>
          <div className="flex items-center space-x-4">
          </div>
        </div>
      </header>
      <main className="container mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-3 gap-y-5 w-full">
        {[
          { label: 'List Drug', path: '/drug' },
          { label: 'Unit 1', path: '/unit1' },
          { label: 'Unit 2', path: '/unit2' },
          { label: 'Unit 3', path: '/unit3' },
          { label: 'Unit 5', path: '/unit5' },
          { label: 'Unit 6', path: '/unit6' },
          { label: 'Unit 7', path: '/unit7' },
          { label: 'Unit 8', path: '/unit8' },
          { label: 'Unit 9', path: '/unit9' },
          { label: 'Unit 10', path: '/unit10' },
          { label: 'Unit 11', path: '/unit11' },
          { label: 'Unit 12', path: '/unit12' },
          { label: 'Unit 13', path: '/unit13' },
          { label: 'Unit 14', path: '/unit14' },
          { label: 'Unit 15', path: '/unit15' }
        ].map((button, index) => (
          <button 
            key={index}
            className="bg-sky-600 text-white font-semibold py-4 px-8 rounded shadow-md hover:bg-sky-900 transition duration-200 w-full"
            onClick={() => window.location.href = button.path}
          >
            {button.label}
          </button>
        ))}
      </div>
    </main>
    </div>
  );
}

export default UnitComponent;
