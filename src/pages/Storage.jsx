import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import Modal from 'react-modal';
import { BsPlusCircle } from 'react-icons/bs';
import { FaEdit, FaTrash } from 'react-icons/fa';

Modal.setAppElement('#root');

function Storage() {
  const [storage, setStorage] = useState([]);
  const [filteredStorage, setFilteredStorage] = useState([]);
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [editName, setEditName] = useState('');
  const [editAmount, setEditAmount] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentStorageId, setCurrentStorageId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');  // New state for search term

  useEffect(() => {
    getStorage();
  }, []);

  useEffect(() => {
    handleSearch();
  }, [searchTerm, storage]);

  const getStorage = async () => {
    try {
      const { data, error } = await supabase
        .from('storage')
        .select('*')
        .order('id', { ascending: false })
        .limit(5);

      if (error) {
        throw error;
      }

      setStorage(data);
      setFilteredStorage(data);
    } catch (error) {
      console.error('Failed to fetch storage:', error);
    }
  };

  const handleAddStorage = async () => {
    try {
      const { data, error } = await supabase
        .from('storage')
        .insert([{ name, amount }])
        .select('*');

      if (error) {
        throw error;
      }

      setStorage([data[0], ...storage]);
      setFilteredStorage([data[0], ...filteredStorage]);
      setShowAddModal(false);
      setName('');
      setAmount('');
    } catch (error) {
      console.error('Failed to add storage:', error);
    }
  };

  const handleEditStorage = async () => {
    try {
      const { data, error } = await supabase
        .from('storage')
        .update({ name: editName, amount: editAmount })
        .eq('id', currentStorageId)
        .select('*');

      if (error) {
        throw error;
      }

      const updatedStorage = storage.map((item) =>
        item.id === currentStorageId ? data[0] : item
      );
      setStorage(updatedStorage);
      setFilteredStorage(updatedStorage);
      setShowEditModal(false);
      setEditName('');
      setEditAmount('');
      setCurrentStorageId(null);
    } catch (error) {
      console.error('Failed to edit storage:', error);
    }
  };

  const handleDeleteStorage = async (id) => {
    try {
      const { error } = await supabase
        .from('storage')
        .delete()
        .eq('id', id);

      if (error) {
        throw error;
      }

      setStorage(storage.filter((item) => item.id !== id));
      setFilteredStorage(filteredStorage.filter((item) => item.id !== id));
    } catch (error) {
      console.error('Failed to delete storage:', error);
    }
  };

  const handleSearch = () => {
    const filtered = storage.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredStorage(filtered);
  };

  return (
    <div>
      <header className="bg-sky-900 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-semibold">Storage Management</h1>
        </div>
      </header>
      <div className="container mx-auto mt-6 flex justify-between items-center">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          className="bg-green-500 text-white py-2 px-4 rounded-md flex items-center hover:bg-green-600"
          onClick={() => setShowAddModal(true)}
        >
          <BsPlusCircle className="mr-2" />
          New Storage
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
            {filteredStorage.map((item) => (
              <tr key={item.id} className="hover:bg-gray-100">
                <td className="py-2 px-4 border">{item.name}</td>
                <td className="py-2 px-4 border">{item.amount}</td>
                <td className="py-2 px-4 border">
                  <button
                    className="text-yellow-500 hover:text-yellow-700 mr-2"
                    onClick={() => {
                      setCurrentStorageId(item.id);
                      setEditName(item.name);
                      setEditAmount(item.amount);
                      setShowEditModal(true);
                    }}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleDeleteStorage(item.id)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>

      {/* Modal for Adding New Storage */}
      <Modal
        isOpen={showAddModal}
        onRequestClose={() => setShowAddModal(false)}
        contentLabel="New Storage Modal"
        className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto mt-10"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      >
        <h2 className="text-2xl font-semibold mb-6">New Storage</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAddStorage();
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
              className="mr-3 py-2 px-4 text-white bg-red-500 text-gray-700 rounded-md hover:bg-red-600"
            >
              Cancel
            </button>
            <button type="submit" className="py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600">
              Add Storage
            </button>
          </div>
        </form>
      </Modal>

      {/* Modal for Editing Storage */}
      <Modal
        isOpen={showEditModal}
        onRequestClose={() => setShowEditModal(false)}
        contentLabel="Edit Storage Modal"
        className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto mt-10"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      >
        <h2 className="text-2xl font-semibold mb-6">Edit Storage</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleEditStorage();
          }}
        >
          <div className="mb-5">
            <label className="block text-gray-700 text-sm font-medium mb-2">Name</label>
            <input
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-5">
            <label className="block text-gray-700 text-sm font-medium mb-2">Amount</label>
            <input
              type="number"
              value={editAmount}
              onChange={(e) => setEditAmount(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => setShowEditModal(false)}
              className="mr-3 py-2 px-4 text-white bg-red-500 rounded-md hover:bg-red-600"
            >
              Cancel
            </button>
            <button type="submit" className="py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600">
              Save Changes
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default Storage;
