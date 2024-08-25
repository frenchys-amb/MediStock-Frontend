import React from 'react';
import BaseTable from './BaseTable';

const columns = [
  { Header: 'First Name', accessor: 'name' },
  { Header: 'License', accessor: 'license' },
  { Header: 'Unit', accessor: 'unit' },
  { Header: 'Medication', accessor: 'medication' },
  { Header: 'Amount', accessor: 'amount' },
  { Header: 'Date', accessor: 'date' },
];

const RecordTable = () => (
  <BaseTable tableName="record" columns={columns} />
);

export default RecordTable;
