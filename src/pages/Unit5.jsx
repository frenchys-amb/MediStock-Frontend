import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import Modal from 'react-modal';
import { BsPlusCircle } from 'react-icons/bs';
import { FaEdit, FaTrash } from 'react-icons/fa';

Modal.setAppElement('#root');

function Unit5() {
  const [units, setUnits] = useState([]);
  const [drugs, setDrugs] = useState([]);
  const [selectedDrug, setSelectedDrug] = useState('');
  const [amount, setAmount] = useState('');
  const [editDrug, setEditDrug] = useState('');
  const [editAmount, setEditAmount] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentUnitId, setCurrentUnitId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (searchTerm) {
      handleSearch();
    } else {
      getLatestUnits();
    }
  }, [searchTerm]);

  const getLatestUnits = async () => {
    try {
      const { data, error } = await supabase
        .from('unit5')
        .select('*')
        .order('id', { ascending: false })
        .limit(5);

      if (error) {
        throw error;
      }

      setUnits(data);
    } catch (error) {
      console.error('Failed to fetch units:', error);
    }
  };

  const handleSearch = async () => {
    try {
      const { data, error } = await supabase
        .from('unit5')
        .select('*')
        .ilike('name', `%${searchTerm}%`);

      if (error) {
        throw error;
      }

      setUnits(data);
      setIsSearching(true);
    } catch (error) {
      console.error('Failed to search units:', error);
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

  const handleAddUnit = async () => {
    try {
      const { data, error } = await supabase
        .from('unit5')
        .insert([{ name: selectedDrug, amount }])
        .select('*');

      if (error) {
        throw error;
      }

      if (!isSearching) {
        setUnits([data[0], ...units.slice(0, 4)]); // Keep only the latest 5 units
      } else {
        setUnits([data[0], ...units]);
      }
      setShowAddModal(false);
      setSelectedDrug('');
      setAmount('');
    } catch (error) {
      console.error('Failed to add unit:', error);
    }
  };

  const handleEditUnit = async () => {
    try {
      const { data, error } = await supabase
        .from('unit5')
        .update({ name: editDrug, amount: editAmount })
        .eq('id', currentUnitId)
        .select('*');

      if (error) {
        throw error;
      }

      const updatedUnits = units.map((item) =>
        item.id === currentUnitId ? data[0] : item
      );
      setUnits(updatedUnits);
      setShowEditModal(false);
      setEditDrug('');
      setEditAmount('');
      setCurrentUnitId(null);
    } catch (error) {
      console.error('Failed to edit unit:', error);
    }
  };

  const handleDeleteUnit = async (id) => {
    try {
      const { error } = await supabase
        .from('unit5')
        .delete()
        .eq('id', id);

      if (error) {
        throw error;
      }

      setUnits(units.filter((item) => item.id !== id));
    } catch (error) {
      console.error('Failed to delete unit:', error);
    }
  };

  return (
    <div>
      <header className="bg-sky-900 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-semibold">Unit 5 Management</h1>
        </div>
      </header>
      <div className="container mx-auto mt-6 flex justify-between items-center">
        <input
          type="text"
          placeholder="Search by Name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-1/4 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
        />
        <button
          className="bg-green-500 text-white py-2 px-4 rounded-md flex items-center hover:bg-green-600 ml-4"
          onClick={() => setShowAddModal(true)}
        >
          <BsPlusCircle className="mr-2" />
          New Unit
        </button>
      </div>
      <main className="container mx-auto p-6">
        <table className="min-w-full border border-sky-900 my-4">
          <thead>
            <tr className="bg-sky-900 text-white">
              <th className="py-2 px-4 border">Name</th>
              <th className="py-2 px-4 border">Amount</th>
              <th className="py-2 px-4 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {units.map((item) => (
              <tr key={item.id} className="hover:bg-gray-100">
                <td className="py-2 px-4 border">{item.name}</td>
                <td className="py-2 px-4 border">{item.amount}</td>
                <td className="py-2 px-4 border">
                  <button
                    className="text-yellow-500 hover:text-yellow-700 mr-2"
                    onClick={() => {
                      setCurrentUnitId(item.id);
                      setEditDrug(item.name);
                      setEditAmount(item.amount);
                      setShowEditModal(true);
                    }}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleDeleteUnit(item.id)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>

      {/* Modal for Adding New Unit */}
      <Modal
        isOpen={showAddModal}
        onRequestClose={() => setShowAddModal(false)}
        contentLabel="New Unit Modal"
        className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto mt-10"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      >
        <h2 className="text-2xl font-semibold mb-6">New Unit</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAddUnit();
          }}
        >
          <div className="mb-5">
            <label className="block text-gray-700 text-sm font-medium mb-2">Name</label>
            <select
              value={selectedDrug}
              onChange={(e) => setSelectedDrug(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            >
              <option value="">Select a drug</option>
              {drugs.map((name, index) => (
                <option key={index} value={name}>{name}</option>
              ))}
            </select>
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
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => setShowAddModal(false)}
              className="bg-red-500 text-white py-2 px-4 rounded-md mr-2 hover:bg-red-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
            >
              Add Unit
            </button>
          </div>
        </form>
      </Modal>

      {/* Modal for Editing Unit */}
      <Modal
        isOpen={showEditModal}
        onRequestClose={() => setShowEditModal(false)}
        contentLabel="Edit Unit Modal"
        className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto mt-10"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      >
        <h2 className="text-2xl font-semibold mb-6">Edit Unit</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleEditUnit();
          }}
        >
          <div className="mb-5">
            <label className="block text-gray-700 text-sm font-medium mb-2">Name</label>
            <input
              type="text"
              value={editDrug}
              onChange={(e) => setEditDrug(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            />
          </div>
          <div className="mb-5">
            <label className="block text-gray-700 text-sm font-medium mb-2">Amount</label>
            <input
              type="number"
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
              className="bg-red-500 text-white py-2 px-4 rounded-md mr-2 hover:bg-red-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600"
            >
              Save Changes
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default Unit5;


