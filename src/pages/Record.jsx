import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import Modal from 'react-modal';
import { BsPlusCircle } from 'react-icons/bs';
import { FaEdit, FaTrash } from 'react-icons/fa';

Modal.setAppElement('#root');

function Record() {
  const [records, setRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [name, setName] = useState('');
  const [license, setLicense] = useState('');
  const [medication, setMedication] = useState('');
  const [amount, setAmount] = useState('');
  const [unit, setUnit] = useState('');
  const [editName, setEditName] = useState('');
  const [editLicense, setEditLicense] = useState('');
  const [editMedication, setEditMedication] = useState('');
  const [editAmount, setEditAmount] = useState('');
  const [editUnit, setEditUnit] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentRecordId, setCurrentRecordId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    getRecords();
  }, []);

  useEffect(() => {
    filterRecords();
  }, [searchTerm, records]);

  const getRecords = async () => {
    try {
      const { data, error } = await supabase
        .from('record')
        .select('*')
        .order('id', { ascending: false })
        .limit(5);

      if (error) {
        throw error;
      }

      setRecords(data);
      setFilteredRecords(data);
    } catch (error) {
      console.error('Failed to fetch records:', error);
    }
  };

  const filterRecords = () => {
    const lowercasedSearchTerm = searchTerm.toLowerCase();
    const filtered = records.filter(record =>
      record.name.toLowerCase().includes(lowercasedSearchTerm) ||
      record.license.toLowerCase().includes(lowercasedSearchTerm) ||
      record.medication.toLowerCase().includes(lowercasedSearchTerm) ||
      record.amount.toString().includes(lowercasedSearchTerm) ||
      record.unit.toLowerCase().includes(lowercasedSearchTerm)
    );
    setFilteredRecords(filtered);
  };

  const handleAddRecord = async () => {
    try {
      const { data, error } = await supabase
        .from('record')
        .insert([{ name, license, medication, amount, unit }])
        .select('*');

      if (error) {
        throw error;
      }

      setRecords([data[0], ...records]);
      setFilteredRecords([data[0], ...filteredRecords]);
      setShowAddModal(false);
      setName('');
      setLicense('');
      setMedication('');
      setAmount('');
      setUnit('');
    } catch (error) {
      console.error('Failed to add record:', error);
    }
  };

  const handleEditRecord = async () => {
    try {
      const { data, error } = await supabase
        .from('record')
        .update({ name: editName, license: editLicense, medication: editMedication, amount: editAmount, unit: editUnit })
        .eq('id', currentRecordId)
        .select('*');

      if (error) {
        throw error;
      }

      const updatedRecords = records.map((item) =>
        item.id === currentRecordId ? data[0] : item
      );
      setRecords(updatedRecords);
      setFilteredRecords(updatedRecords);
      setShowEditModal(false);
      setEditName('');
      setEditLicense('');
      setEditMedication('');
      setEditAmount('');
      setEditUnit('');
      setCurrentRecordId(null);
    } catch (error) {
      console.error('Failed to edit record:', error);
    }
  };

  const handleDeleteRecord = async (id) => {
    try {
      const { error } = await supabase
        .from('record')
        .delete()
        .eq('id', id);

      if (error) {
        throw error;
      }

      setRecords(records.filter((item) => item.id !== id));
      setFilteredRecords(filteredRecords.filter((item) => item.id !== id));
    } catch (error) {
      console.error('Failed to delete record:', error);
    }
  };

  return (
    <div>
      <header className="bg-sky-900 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-semibold">Record Management</h1>
        </div>
      </header>
      <div className="container mx-auto mt-6">
        <div className="flex justify-between items-center">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search records..."
            className="w-full max-w-xs px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
          <button
            className="bg-green-500 text-white py-2 px-4 rounded-md flex items-center hover:bg-green-600"
            onClick={() => setShowAddModal(true)}
          >
            <BsPlusCircle className="mr-2" />
            New Record
          </button>
        </div>
      </div>
      <main className="container mx-auto p-6">
        <table className="min-w-full border border-sky-900 my-4">
          <thead>
            <tr className="bg-sky-900 text-white">
              <th className="py-2 px-4 border">Name</th>
              <th className="py-2 px-4 border">License</th>
              <th className="py-2 px-4 border">Medication</th>
              <th className="py-2 px-4 border">Amount</th>
              <th className="py-2 px-4 border">Unit</th>
              <th className="py-2 px-4 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRecords.map((item) => (
              <tr key={item.id} className="hover:bg-gray-100">
                <td className="py-2 px-4 border">{item.name}</td>
                <td className="py-2 px-4 border">{item.license}</td>
                <td className="py-2 px-4 border">{item.medication}</td>
                <td className="py-2 px-4 border">{item.amount}</td>
                <td className="py-2 px-4 border">{item.unit}</td>
                <td className="py-2 px-4 border">
                  <button
                    className="text-yellow-500 hover:text-yellow-700 mr-2"
                    onClick={() => {
                      setCurrentRecordId(item.id);
                      setEditName(item.name);
                      setEditLicense(item.license);
                      setEditMedication(item.medication);
                      setEditAmount(item.amount);
                      setEditUnit(item.unit);
                      setShowEditModal(true);
                    }}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleDeleteRecord(item.id)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>

      {/* Modal for Adding New Record */}
      <Modal
        isOpen={showAddModal}
        onRequestClose={() => setShowAddModal(false)}
        contentLabel="New Record Modal"
        className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto mt-10"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      >
        <h2 className="text-2xl font-semibold mb-6">New Record</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAddRecord();
          }}
        >
          <div className="mb-5">
            <label className="block text-gray-700 text-sm font-medium mb-2">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
          <div className="mb-5">
            <label className="block text-gray-700 text-sm font-medium mb-2">License</label>
            <input
              type="text"
              value={license}
              onChange={(e) => setLicense(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
          <div className="mb-5">
            <label className="block text-gray-700 text-sm font-medium mb-2">Medication</label>
            <input
              type="text"
              value={medication}
              onChange={(e) => setMedication(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
          <div className="mb-5">
            <label className="block text-gray-700 text-sm font-medium mb-2">Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
          <div className="mb-5">
            <label className="block text-gray-700 text-sm font-medium mb-2">Unit</label>
            <input
              type="text"
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => setShowAddModal(false)}
              className="bg-red-500 py-2 px-4 rounded-md text-white hover:bg-red-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-500 py-2 px-4 rounded-md text-white hover:bg-green-600"
            >
              Add Record
            </button>
          </div>
        </form>
      </Modal>

      {/* Modal for Editing Record */}
      <Modal
        isOpen={showEditModal}
        onRequestClose={() => setShowEditModal(false)}
        contentLabel="Edit Record Modal"
        className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto mt-10"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      >
        <h2 className="text-2xl font-semibold mb-6">Edit Record</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleEditRecord();
          }}
        >
          <div className="mb-5">
            <label className="block text-gray-700 text-sm font-medium mb-2">Name</label>
            <input
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
          <div className="mb-5">
            <label className="block text-gray-700 text-sm font-medium mb-2">License</label>
            <input
              type="text"
              value={editLicense}
              onChange={(e) => setEditLicense(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
          <div className="mb-5">
            <label className="block text-gray-700 text-sm font-medium mb-2">Medication</label>
            <input
              type="text"
              value={editMedication}
              onChange={(e) => setEditMedication(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
          <div className="mb-5">
            <label className="block text-gray-700 text-sm font-medium mb-2">Amount</label>
            <input
              type="number"
              value={editAmount}
              onChange={(e) => setEditAmount(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
          <div className="mb-5">
            <label className="block text-gray-700 text-sm font-medium mb-2">Unit</label>
            <input
              type="text"
              value={editUnit}
              onChange={(e) => setEditUnit(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => setShowEditModal(false)}
              className="bg-red-500 py-2 px-4 rounded-md text-white hover:bg-red-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-500 py-2 px-4 rounded-md text-white hover:bg-green-600"
            >
              Save Changes
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default Record;
