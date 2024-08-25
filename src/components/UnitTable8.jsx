import React from 'react';
import BaseTable from './BaseTable';

const columns = [
  { Header: 'Medication', accessor: 'name' },
  { Header: 'Amount', accessor: 'amount' },
];

const Unit8Table = () => (
  <BaseTable tableName="unit8" columns={columns} />
);

export default Unit8Table;