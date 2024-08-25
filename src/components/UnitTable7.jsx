import React from 'react';
import BaseTable from './BaseTable';

const columns = [
  { Header: 'Medication', accessor: 'name' },
  { Header: 'Amount', accessor: 'amount' },
];

const Unit7Table = () => (
  <BaseTable tableName="unit7" columns={columns} />
);

export default Unit7Table;