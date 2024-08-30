import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import Modal from 'react-modal';
import { BsPlusCircle } from 'react-icons/bs';
import { FaEdit, FaTrash } from 'react-icons/fa';

Modal.setAppElement('#root');

function Medication() {
  const [medications, setMedications] = useState([]);
  const [filteredMedications, setFilteredMedications] = useState([]);
  const [drugs, setDrugs] = useState([]);
  const [medicationName, setMedicationName] = useState('');
  const [dose, setDose] = useState('');
  const [amount, setAmount] = useState('');
  const [editMedicationName, setEditMedicationName] = useState('');
  const [editDose, setEditDose] = useState('');
  const [editAmount, setEditAmount] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentMedicationId, setCurrentMedicationId] = useState(null);
  const [searchTerm, setSearchTerm] = useState(''); // State to track search input

  useEffect(() => {
    getMedications();
    getDrugs();
  }, []);

  useEffect(() => {
    handleSearch(); // Llama a handleSearch cuando cambia el término de búsqueda
  }, [searchTerm]);

  const getMedications = async () => {
    try {
      const { data, error } = await supabase
        .from('medication')
        .select('*')
        .order('id', { ascending: false })
        .limit(5);

      if (error) {
        throw error;
      }

      setMedications(data);
      setFilteredMedications(data);
    } catch (error) {
      console.error('Failed to fetch medications:', error);
    }
  };

  const getDrugs = async () => {
    try {
      const { data, error } = await supabase
        .from('drug')
        .select('name');

      if (error) {
        throw error;
      }

      setDrugs(data.map(drug => drug.name));
    } catch (error) {
      console.error('Failed to fetch drugs:', error);
    }
  };

  const handleSearch = async () => {
    try {
      const { data, error } = await supabase
        .from('medication')
        .select('*')
        .ilike('name', `%${searchTerm}%`);

      if (error) {
        throw error;
      }

      setFilteredMedications(data); // Actualiza el estado filteredMedications
    } catch (error) {
      console.error('Failed to search units:', error);
    }
  };

    const handleAddMedication = async () => {
     try {
      const { data, error } = await supabase
        .from('medication')
        .insert([{ name: medicationName, dose, amount }])
        .select('*');

      if (error) {
        throw error;
      }

      setMedications([data[0], ...medications]);
      setFilteredMedications([data[0], ...filteredMedications]);
      setShowAddModal(false);
      setMedicationName('');
      setDose('');
      setAmount('');
    } catch (error) {
      console.error('Failed to add medication:', error);
    }
  };

  const handleEditMedication = async () => {
    try {
      const { data, error } = await supabase
        .from('medication')
        .update({ name: editMedicationName, dose: editDose, amount: editAmount })
        .eq('id', currentMedicationId)
        .select('*');

      if (error) {
        throw error;
      }

      const updatedMedications = medications.map((item) =>
        item.id === currentMedicationId ? data[0] : item
      );
      setMedications(updatedMedications);
      setFilteredMedications(updatedMedications);
      setShowEditModal(false);
      setEditMedicationName('');
      setEditDose('');
      setEditAmount('');
      setCurrentMedicationId(null);
    } catch (error) {
      console.error('Failed to edit medication:', error);
    }
  };

  const handleDeleteMedication = async (id) => {
    try {
      const { error } = await supabase
        .from('medication')
        .delete()
        .eq('id', id);

      if (error) {
        throw error;
      }

      setMedications(medications.filter((item) => item.id !== id));
      setFilteredMedications(filteredMedications.filter((item) => item.id !== id));
    } catch (error) {
      console.error('Failed to delete medication:', error);
    }
  };

  return (
    <div>
      <header className="bg-sky-900 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-semibold">Medication Management</h1>
        </div>
      </header>
      <div className="container mx-auto mt-6 flex justify-between">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search medication..."
          className="w-1/4 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
        />
        <button
          className="bg-green-500 text-white py-2 px-4 rounded-md flex items-center hover:bg-green-600"
          onClick={() => setShowAddModal(true)}
        >
          <BsPlusCircle className="mr-2" />
          New Medication
        </button>
      </div>
      <main className="container mx-auto p-6">
        <table className="min-w-full border border-sky-900 my-4">
          <thead>
            <tr className="bg-sky-900 text-white">
              <th className="py-2 px-4 border">Name</th>
              <th className="py-2 px-4 border">Dose</th>
              <th className="py-2 px-4 border">Amount</th>
              <th className="py-2 px-4 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredMedications.map((item) => (
              <tr key={item.id} className="hover:bg-gray-100">
                <td className="py-2 px-4 border">{item.name}</td>
                <td className="py-2 px-4 border">{item.dose}</td>
                <td className="py-2 px-4 border">{item.amount}</td>
                <td className="py-2 px-4 border">
                  <button
                    className="text-yellow-500 hover:text-yellow-700 mr-2"
                    onClick={() => {
                      setCurrentMedicationId(item.id);
                      setEditMedicationName(item.name);
                      setEditDose(item.dose);
                      setEditAmount(item.amount);
                      setShowEditModal(true);
                    }}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleDeleteMedication(item.id)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>

      {/* Modal for Adding New Medication */}
      <Modal
        isOpen={showAddModal}
        onRequestClose={() => setShowAddModal(false)}
        contentLabel="New Medication Modal"
        className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto mt-10"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      >
        <h2 className="text-2xl font-semibold mb-6">New Medication</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAddMedication();
          }}
        >
          <div className="mb-5">
            <label className="block text-gray-700 text-sm font-medium mb-2">Name</label>
            <select
              value={medicationName}
              onChange={(e) => setMedicationName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            >
              <option value="">Select a drug</option>
              {drugs.map((drugName, index) => (
                <option key={index} value={drugName}>{drugName}</option>
              ))}
            </select>
          </div>
          <div className="mb-5">
            <label className="block text-gray-700 text-sm font-medium mb-2">Dose</label>
            <input
              type="text"
              value={dose}
              onChange={(e) => setDose(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
          <div className="mb-5">
            <label className="block text-gray-700 text-sm font-medium mb-2">Amount</label>
            <input
              type="text"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => setShowAddModal(false)}
              className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
            >
              Add Medication
            </button>
          </div>
        </form>
      </Modal>

      {/* Modal for Editing Medication */}
      <Modal
        isOpen={showEditModal}
        onRequestClose={() => setShowEditModal(false)}
        contentLabel="Edit Medication Modal"
        className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto mt-10"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      >
        <h2 className="text-2xl font-semibold mb-6">Edit Medication</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleEditMedication();
          }}
        >
          <div className="mb-5">
            <label className="block text-gray-700 text-sm font-medium mb-2">Name</label>
            <input
              type="text"
              value={editMedicationName}
              onChange={(e) => setEditMedicationName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            />
          </div>
          <div className="mb-5">
            <label className="block text-gray-700 text-sm font-medium mb-2">Dose</label>
            <input
              type="text"
              value={editDose}
              onChange={(e) => setEditDose(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            />
          </div>
          <div className="mb-5">
            <label className="block text-gray-700 text-sm font-medium mb-2">Amount</label>
            <input
              type="text"
              value={editAmount}
              onChange={(e) => setEditAmount(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => setShowEditModal(false)}
              className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
            >
              Save Changes
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default Medication;
