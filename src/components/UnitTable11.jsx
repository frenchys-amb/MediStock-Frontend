import React from 'react';
import BaseTable from './BaseTable';

const columns = [
  { Header: 'Medication', accessor: 'name' },
  { Header: 'Amount', accessor: 'amount' },
];

const Unit11Table = () => (
  <BaseTable tableName="unit11" columns={columns} />
);

export default Unit11Table;