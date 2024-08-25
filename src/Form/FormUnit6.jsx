import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

const FormUnit6 = () => {
  const [name, setName] = useState('');
  const [license, setLicense] = useState('');
  const [medication, setMedication] = useState('');
  const [amount, setAmount] = useState('');
  const [drugs, setDrugs] = useState([]);
  const [medicationAmount, setMedicationAmount] = useState(0);

  useEffect(() => {
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

    fetchDrugs();
  }, []);

  useEffect(() => {
    const fetchMedicationAmount = async () => {
      if (medication) {
        try {
          const { data, error } = await supabase
            .from('unit6')
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
      const { data: existingRecord, error: selectError } = await supabase
        .from('formunit6')
        .select('*')
        .eq('name', name)
        .single();

      if (selectError && selectError.code !== 'PGRST116') {
        throw selectError;
      }

      if (existingRecord) {
        // Si el registro ya existe, actualízalo
        const { error: updateError } = await supabase
          .from('formunit6')
          .update(data)
          .eq('name', name);

        if (updateError) {
          throw updateError;
        }
      } else {
        // Si no existe, inserta un nuevo registro
        const { error: insertError } = await supabase
          .from('formunit6')
          .insert([data]);

        if (insertError) {
          throw insertError;
        }
      }

      // Actualizar la cantidad en la tabla unit6
      const { error: updateUnitError } = await supabase
        .from('unit6')
        .update({ amount: medicationAmount - amount })
        .eq('name', medication);

      if (updateUnitError) {
        throw updateUnitError;
      }

      // Opcional: Puedes redirigir o mostrar un mensaje de éxito en lugar de recargar
      window.location.reload();
    } catch (error) {
      console.error('Error submitting the form:', error);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Formulario de Unidad 6</h2>
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

export default FormUnit6;

