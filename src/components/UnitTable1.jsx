import React from 'react';
import BaseTable from './BaseTable';

const columns = [
  { Header: 'Medication', accessor: 'name' },
  { Header: 'Amount', accessor: 'amount' },
];

const Unit1Table = () => (
  <BaseTable tableName="unit1" columns={columns} />
);

export default Unit1Table;
