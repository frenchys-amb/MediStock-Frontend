import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

const FormUnit1 = () => {
  const [name, setName] = useState('');
  const [license, setLicense] = useState('');
  const [medication, setMedication] = useState('');
  const [amount, setAmount] = useState('');
  const [drugs, setDrugs] = useState([]);
  const [medicationAmount, setMedicationAmount] = useState(0);

  // Fetch drugs list
  const fetchDrugs = async () => {
    try {
      const { data, error } = await supabase.from('drug').select('*');
      if (error) {
        throw error;
      }
      setDrugs(data);
    } catch (error) {
      console.error('Error fetching drugs:', error);
    }
  };

  useEffect(() => {
    fetchDrugs();
  }, []);

  // Fetch medication amount based on selected medication
  useEffect(() => {
    const fetchMedicationAmount = async () => {
      if (medication) {
        try {
          const { data, error } = await supabase
            .from('unit1')
            .select('amount')
            .eq('name', medication)
            .single();

          if (error) {
            throw error;
          }
          setMedicationAmount(data ? data.amount : 0);
        } catch (error) {
          console.error('Error fetching medication amount:', error);
        }
      } else {
        setMedicationAmount(0);
      }
    };
    fetchMedicationAmount();
  }, [medication]);

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (amount > medicationAmount) {
      alert('La cantidad excede el stock disponible.');
      return;
    }

    const data = {
      name,
      license,
      medication,
      amount,
    };

    try {
      // Attempt to insert the new record
      const { error: insertError } = await supabase
        .from('formunit1')
        .insert([data]);

      if (insertError) {
        // Handle the unique constraint error
        if (insertError.code === '23505') {
          console.warn('Duplicate entry, but continuing to handle it.');
          // You can choose to ignore or handle this case as needed
        } else {
          throw insertError;
        }
      }

      // Update the amount in the unit9 table
      const { error: updateUnitError } = await supabase
        .from('unit1')
        .update({ amount: medicationAmount - amount })
        .eq('name', medication);

      if (updateUnitError) {
        throw updateUnitError;
      }

      alert('Datos guardados correctamente');

      // Clear form fields and refresh data
      setName('');
      setLicense('');
      setMedication('');
      setAmount('');
      setMedicationAmount(0);
      
      // Refresh the drug list
      await fetchDrugs();

    } catch (error) {
      console.error('Error submitting the form:', error);
      alert('Ocurrió un error al enviar el formulario. Por favor, inténtelo de nuevo.');
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Formulario de Unidad 1</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Name:
          </label>
          <input 
            type="text" 
            value={name} 
            onChange={(event) => setName(event.target.value)} 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            License:
          </label>
          <input 
            type="text" 
            value={license} 
            onChange={(event) => setLicense(event.target.value)} 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Medication:
          </label>
          <select 
            value={medication} 
            onChange={(event) => setMedication(event.target.value)} 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Seleccionar medicamento</option>
            {drugs.length > 0 ? (
              drugs.map((med) => (
                <option key={med.id} value={med.name}>
                  {med.name}
                </option>
              ))
            ) : (
              <option>Cargando...</option>
            )}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Amount:
          </label>
          <select 
            value={amount} 
            onChange={(event) => setAmount(Number(event.target.value))} 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Select amount</option>
            {[...Array(11).keys()].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>
        <div className="flex justify-center">
          <button 
            type="submit" 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormUnit1;
