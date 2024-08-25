import React from 'react';
import BaseTable from './BaseTable';

const columns = [
  { Header: 'Medication', accessor: 'name' },
  { Header: 'Amount', accessor: 'amount' },
];

const Unit5Table = () => (
  <BaseTable tableName="unit5" columns={columns} />
);

export default Unit5Table;