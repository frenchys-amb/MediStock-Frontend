import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import Modal from 'react-modal';
import { BsPlusCircle } from 'react-icons/bs';
import { FaEdit, FaTrash } from 'react-icons/fa';

Modal.setAppElement('#root');

function ListDrug() {
  const [drugs, setDrugs] = useState([]);
  const [filteredDrugs, setFilteredDrugs] = useState([]);
  const [drugId, setDrugId] = useState(null);
  const [name, setName] = useState('');
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    async function getDrugs() {
      try {
        const { data, error } = await supabase
          .from('drug')
          .select('*');
        
        if (error) throw error;

        setDrugs(data);
        setFilteredDrugs(data);
        setLoaded(true);
      } catch (error) {
        console.error('Failed to fetch drugs:', error.message);
      }
    }

    getDrugs();
  }, []);

  useEffect(() => {
    setFilteredDrugs(
      drugs.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, drugs]);

  const handleShowModal = (drug = null) => {
    if (drug) {
      setDrugId(drug.id);
      setName(drug.name);
    } else {
      setDrugId(null);
      setName('');
    }
    setShowModal(true);
  };

  const deleteDrug = async (id) => {
    try {
      const { error } = await supabase
        .from('drug')
        .delete()
        .match({ id });

      if (error) throw error;

      setDrugs(drugs.filter((item) => item.id !== id));
      setFilteredDrugs(filteredDrugs.filter((item) => item.id !== id));
    } catch (error) {
      console.error(`Failed to delete drug with id: ${id}, error: ${error.message}`);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = { name };

    try {
      let { error, data } = drugId
        ? await supabase
            .from('drug')
            .update(formData)
            .match({ id: drugId })
          : await supabase
            .from('drug')
            .insert([formData]);

      if (error) throw error;

      setSuccessMessage('Drug Saved!');
      setErrorMessage([]);
      setShowModal(false);
      refreshDrugs();
    } catch (error) {
      const errorList = error.message
        ? [error.message]
        : ['An unexpected error occurred.'];
      setSuccessMessage(null);
      setErrorMessage(errorList);
    }
  };

  const refreshDrugs = async () => {
    try {
      const { data, error } = await supabase
        .from('drug')
        .select('*');

      if (error) throw error;

      setDrugs(data);
      setFilteredDrugs(data);
    } catch (error) {
      console.error('Failed to fetch drugs:', error.message);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <header className="bg-sky-900 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-semibold">Drug Management</h1>
        </div>
      </header>
      <div className="container mx-auto mt-6 flex items-center justify-between">
        <input
          type="text"
          placeholder="Search Drug..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-1/4 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
        />
        <button
          onClick={() => handleShowModal()}
          className="bg-green-500 text-white py-2 px-4 rounded-md flex items-center hover:bg-green-600"
        >
          <BsPlusCircle className="mr-2" /> Add New Drug
        </button>
      </div>
      <table className="min-w-full border border-sky-900 my-4">
        <thead>
          <tr className="bg-sky-900 text-white">
            <th className="py-2 px-4 border">Name</th>
            <th className="py-2 px-4 border">Actions</th>
          </tr>
        </thead>
        {!loaded ? (
          <tbody>
            <tr className="text-center">
              <td colSpan="2" className="py-5">
                <div className="spinner-border text-success" role="status"></div>
                <span className="text-success" role="status">Loading...</span>
              </td>
            </tr>
          </tbody>
        ) : (
          <tbody>
            {filteredDrugs.length > 0 ? (
              filteredDrugs.map((item) => (
                <tr key={item.id} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border">{item.name}</td>
                  <td className="py-2 px-4 border">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleShowModal(item)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <FaEdit className="inline-block" />
                      </button>
                      <button
                        onClick={() => deleteDrug(item.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FaTrash className="inline-block" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2" className="text-center py-4">
                  No drugs found.
                </td>
              </tr>
            )}
          </tbody>
        )}
      </table>

      <Modal
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
        className="fixed inset-0 flex items-center justify-center z-50"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
          <h2 className="text-lg font-semibold">{drugId ? 'Edit Drug' : 'New Drug'}</h2>
          <form onSubmit={submitHandler} className="my-4">
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full border border-gray-300 rounded p-2"
              />
            </div>
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">
              Save
            </button>
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="ml-2 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700"
            >
              Cancel
            </button>
            {successMessage && <p className="text-green-500 mt-4">{successMessage}</p>}
            {errorMessage.length > 0 && (
              <ul className="text-red-500 mt-4">
                {errorMessage.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            )}
          </form>
        </div>
      </Modal>
    </div>
  );
}

export default ListDrug;
