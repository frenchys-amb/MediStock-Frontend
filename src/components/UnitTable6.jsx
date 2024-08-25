import React from 'react';
import BaseTable from './BaseTable';

const columns = [
  { Header: 'Medication', accessor: 'name' },
  { Header: 'Amount', accessor: 'amount' },
];

const Unit6Table = () => (
  <BaseTable tableName="unit6" columns={columns} />
);

export default Unit6Table;