import React, { useState } from 'react';
import StorageTable from './StorageTable';
import MedicationTable from './MedicationTable';
import RecordTable from './RecordTable';
import UnitTable1 from './UnitTable1';
import UnitTable2 from './UnitTable2';
import UnitTable3 from './UnitTable3';
import UnitTable5 from './UnitTable5';
import UnitTable6 from './UnitTable6';
import UnitTable7 from './UnitTable7';
import UnitTable8 from './UnitTable8';
import UnitTable9 from './UnitTable9';
import UnitTable10 from './UnitTable10';
import UnitTable11 from './UnitTable11';
import UnitTable12 from './UnitTable12';
import UnitTable13 from './UnitTable13';
import UnitTable14 from './UnitTable14';
import UnitTable15 from './UnitTable15';

function App() {
  const [selectedTable, setSelectedTable] = useState(null);

  const renderTable = () => {
    switch (selectedTable) {
      case 'storage':
        return <StorageTable />;
      case 'medication':
        return <MedicationTable />;
      case 'record':
        return <RecordTable />;
      case 'unit1':
        return <UnitTable1 />;
      case 'unit2':
        return <UnitTable2 />;
      case 'unit3':
        return <UnitTable3 />;
      case 'unit5':
        return <UnitTable5 />;
      case 'unit6':
        return <UnitTable6 />;
      case 'unit7':
        return <UnitTable7 />;
      case 'unit8':
        return <UnitTable8 />;
      case 'unit9':
        return <UnitTable9 />;
      case 'unit10':
        return <UnitTable10 />;
      case 'unit11':
        return <UnitTable11 />;
      case 'unit12':
        return <UnitTable12 />;
      case 'unit13':
        return <UnitTable13 />;
      case 'unit14':
        return <UnitTable14 />;
      case 'unit15':
        return <UnitTable15 />;
      default:
        return null;
    }
  };

  return (
    <div>
      <header className="bg-sky-900 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-semibold">Report Unit Data Table</h1>
          <div className="flex items-center space-x-4">
          </div>
        </div>
      </header>

      <main className="container mx-auto p-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 mb-4">
          <button
            className="bg-blue-600 text-white px-2 py-1 text-sm rounded hover:bg-blue-900"
            onClick={() => setSelectedTable('storage')}
          >
            Storage
          </button>
          <button
            className="bg-red-600 text-white px-2 py-1 text-sm rounded hover:bg-red-900"
            onClick={() => setSelectedTable('medication')}
          >
            Medication
          </button>
          <button
            className="bg-yellow-600 text-white px-2 py-1 text-sm rounded hover:bg-yellow-900"
            onClick={() => setSelectedTable('record')}
          >
            Record
          </button>
          <button
            className="bg-sky-600 text-white px-2 py-1 text-sm rounded hover:bg-sky-900"
            onClick={() => setSelectedTable('unit1')}
          >
            Unit1
          </button>
          <button
            className="bg-sky-600 text-white px-2 py-1 text-sm rounded hover:bg-sky-900"
            onClick={() => setSelectedTable('unit2')}
          >
            Unit2
          </button>
          <button
            className="bg-sky-600 text-white px-2 py-1 text-sm rounded hover:bg-sky-900"
            onClick={() => setSelectedTable('unit3')}
          >
            Unit3
          </button>
          <button
            className="bg-sky-600 text-white px-2 py-1 text-sm rounded hover:bg-sky-900"
            onClick={() => setSelectedTable('unit5')}
          >
            Unit5
          </button>
          <button
            className="bg-sky-600 text-white px-2 py-1 text-sm rounded hover:bg-sky-900"
            onClick={() => setSelectedTable('unit6')}
          >
            Unit6
          </button>
          <button
            className="bg-sky-600 text-white px-2 py-1 text-sm rounded hover:bg-sky-900"
            onClick={() => setSelectedTable('unit7')}
          >
            Unit7
          </button>
          <button
            className="bg-sky-600 text-white px-2 py-1 text-sm rounded hover:bg-sky-900"
            onClick={() => setSelectedTable('unit8')}
          >
            Unit8
          </button>
          <button
            className="bg-sky-600 text-white px-2 py-1 text-sm rounded hover:bg-sky-900"
            onClick={() => setSelectedTable('unit9')}
          >
            Unit9
          </button>
          <button
            className="bg-sky-600 text-white px-2 py-1 text-sm rounded hover:bg-sky-900"
            onClick={() => setSelectedTable('unit10')}
          >
            Unit10
          </button>
          <button
            className="bg-sky-600 text-white px-2 py-1 text-sm rounded hover:bg-sky-900"
            onClick={() => setSelectedTable('unit11')}
          >
            Unit11
          </button>
          <button
            className="bg-sky-600 text-white px-2 py-1 text-sm rounded hover:bg-sky-900"
            onClick={() => setSelectedTable('unit12')}
          >
            Unit12
          </button>
          <button
            className="bg-sky-600 text-white px-2 py-1 text-sm rounded hover:bg-sky-900"
            onClick={() => setSelectedTable('unit13')}
          >
            Unit13
          </button>
          <button
            className="bg-sky-600 text-white px-2 py-1 text-sm rounded hover:bg-sky-900"
            onClick={() => setSelectedTable('unit14')}
          >
            Unit14
          </button>
          <button
            className="bg-sky-600 text-white px-2 py-1 text-sm rounded hover:bg-sky-900"
            onClick={() => setSelectedTable('unit15')}
          >
            Unit15
          </button>
         </div>
        <div className="w-full max-w-4xl mx-auto">
          {renderTable()}
        </div>
      </main>
    </div>
  );
}

export default App;
