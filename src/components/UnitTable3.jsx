import React from 'react';
import BaseTable from './BaseTable';

const columns = [
  { Header: 'Medication', accessor: 'name' },
  { Header: 'Amount', accessor: 'amount' },
];

const Unit3Table = () => (
  <BaseTable tableName="unit3" columns={columns} />
);

export default Unit3Table;