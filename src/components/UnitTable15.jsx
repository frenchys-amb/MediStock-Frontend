import React from 'react';
import BaseTable from './BaseTable';

const columns = [
  { Header: 'Medication', accessor: 'name' },
  { Header: 'Amount', accessor: 'amount' },
];

const Unit15Table = () => (
  <BaseTable tableName="unit15" columns={columns} />
);

export default Unit15Table;