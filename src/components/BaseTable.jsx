import React, { useEffect, useState } from 'react';
import { useTable } from 'react-table';
import { CSVLink } from 'react-csv';
import { supabase } from '../supabaseClient'; // Import your Supabase client

const BaseTable = ({ columns, tableName }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: fetchedData, error } = await supabase
          .from(tableName)
          .select('*');

        if (error) {
          throw error;
        }

        setData(fetchedData);
      } catch (error) {
        console.error('Error fetching data from Supabase:', error);
      }
    };

    fetchData();
  }, [tableName]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <div className="mb-4 flex justify-end">
        <CSVLink
          data={data}
          filename={`${tableName}.csv`}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Download CSV
        </CSVLink>
      </div>
      <table {...getTableProps()} className="min-w-full bg-white border border-gray-200">
        <thead className="bg-gray-100 border-b">
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()} className="px-4 py-2 text-left text-gray-600 font-semibold">
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} className="border-b hover:bg-gray-50">
                {row.cells.map(cell => (
                  <td {...cell.getCellProps()} className="px-4 py-2 text-gray-800">
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default BaseTable;
