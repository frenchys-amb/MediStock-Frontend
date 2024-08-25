import React from 'react';
import BaseTable from './BaseTable';

const columns = [
  { Header: 'Medication', accessor: 'name' },
  { Header: 'Amount', accessor: 'amount' },
];

const Unit14Table = () => (
  <BaseTable tableName="unit14" columns={columns} />
);

export default Unit14Table;