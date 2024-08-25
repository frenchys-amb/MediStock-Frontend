import React from 'react';
import BaseTable from './BaseTable';

const columns = [
  { Header: 'Medication', accessor: 'name' },
  { Header: 'Amount', accessor: 'amount' },
];

const Unit12Table = () => (
  <BaseTable tableName="unit12" columns={columns} />
);

export default Unit12Table;