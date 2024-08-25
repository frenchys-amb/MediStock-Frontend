import React, { useState } from 'react';
import FormUnit1 from './FormUnit1';
import FormUnit2 from './FormUnit2';
import FormUnit3 from './FormUnit3';
import FormUnit5 from './FormUnit5';
import FormUnit6 from './FormUnit6';
import FormUnit7 from './FormUnit7';
import FormUnit8 from './FormUnit8';
import FormUnit9 from './FormUnit9';
import FormUnit10 from './FormUnit10';
import FormUnit11 from './FormUnit11';
import FormUnit12 from './FormUnit12';
import FormUnit13 from './FormUnit13';
import FormUnit14 from './FormUnit14';
import FormUnit15 from './FormUnit15';

function Appform() {
    const [selectedTable, setSelectedTable] = useState(null);

    const renderTable = () => {
        switch (selectedTable) {
          case 'formunit1':
            return <FormUnit1 />;
          case 'formunit2':
            return <FormUnit2 />;
          case 'formunit3':
            return <FormUnit3 />;
          case 'formunit5':
            return <FormUnit5 />;
          case 'formunit6':
            return <FormUnit6 />;
          case 'formunit7':
            return <FormUnit7 />;
          case 'formunit8':
            return <FormUnit8 />;
          case 'formunit9':
            return <FormUnit9 />;
          case 'formunit10':
            return <FormUnit10 />;
          case 'formunit11':
            return <FormUnit11 />;
          case 'formunit12':
            return <FormUnit12 />;
          case 'formunit13':
            return <FormUnit13 />;
          case 'formunit14':
            return <FormUnit14 />;
          case 'formunit15':
            return <FormUnit15 />;
      default:
        return null;
    }
  };

  return (
    <div>
      <header className="bg-sky-900 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-semibold">Report Form QR Data Table</h1>
          <div className="flex items-center space-x-4">
          </div>
        </div>
      </header>

      <main className="container mx-auto p-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 mb-4"><button
            className="bg-teal-600 text-white px-2 py-1 text-sm rounded hover:bg-teal-900"
            onClick={() => setSelectedTable('formunit1')}
          >
            Unit 1 Form
          </button>
          <button
            className="bg-teal-600 text-white px-2 py-1 text-sm rounded hover:bg-teal-900"
            onClick={() => setSelectedTable('formunit2')}
          >
            Unit 2 Form
          </button>
          <button
            className="bg-teal-600 text-white px-2 py-1 text-sm rounded hover:bg-teal-900"
            onClick={() => setSelectedTable('formunit3')}
          >
            Unit 3 Form
          </button>
          <button
            className="bg-teal-600 text-white px-2 py-1 text-sm rounded hover:bg-teal-900"
            onClick={() => setSelectedTable('formunit5')}
          >
            Unit 5 Form
          </button>
          <button
            className="bg-teal-600 text-white px-2 py-1 text-sm rounded hover:bg-teal-900"
            onClick={() => setSelectedTable('formunit6')}
          >
            Unit 6 Form
          </button>
          <button
            className="bg-teal-600 text-white px-2 py-1 text-sm rounded hover:bg-teal-900"
            onClick={() => setSelectedTable('formunit7')}
          >
            Unit 7 Form
          </button>
          <button
            className="bg-teal-600 text-white px-2 py-1 text-sm rounded hover:bg-teal-900"
            onClick={() => setSelectedTable('formunit8')}
          >
            Unit 8 Form
          </button>
          <button
            className="bg-teal-600 text-white px-2 py-1 text-sm rounded hover:bg-teal-900"
            onClick={() => setSelectedTable('formunit9')}
          >
            Unit 9 Form
          </button>
          <button
            className="bg-teal-600 text-white px-2 py-1 text-sm rounded hover:bg-teal-900"
            onClick={() => setSelectedTable('formunit10')}
          >
            Unit 10 Form
          </button>
          <button
            className="bg-teal-600 text-white px-2 py-1 text-sm rounded hover:bg-teal-900"
            onClick={() => setSelectedTable('formunit11')}
          >
            Unit 11 Form
          </button>
          <button
            className="bg-teal-600 text-white px-2 py-1 text-sm rounded hover:bg-teal-900"
            onClick={() => setSelectedTable('formunit12')}
          >
            Unit 12 Form
          </button>
          <button
            className="bg-teal-600 text-white px-2 py-1 text-sm rounded hover:bg-teal-900"
            onClick={() => setSelectedTable('formunit13')}
          >
            Unit 13 Form
          </button>
          <button
            className="bg-teal-600 text-white px-2 py-1 text-sm rounded hover:bg-teal-900"
            onClick={() => setSelectedTable('formunit14')}
          >
            Unit 14 Form
          </button>
          <button
            className="bg-teal-600 text-white px-2 py-1 text-sm rounded hover:bg-teal-900"
            onClick={() => setSelectedTable('formunit15')}
          >
            Unit 15 Form
          </button>
        </div>
        <div className="w-full max-w-4xl mx-auto">
          {renderTable()}
        </div>
      </main>
    </div>
  );
}

export default Appform;
