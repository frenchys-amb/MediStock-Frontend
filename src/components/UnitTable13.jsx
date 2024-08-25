import React from 'react';
import BaseTable from './BaseTable';

const columns = [
  { Header: 'Medication', accessor: 'name' },
  { Header: 'Amount', accessor: 'amount' },
];

const Unit13Table = () => (
  <BaseTable tableName="unit13" columns={columns} />
);

export default Unit13Table;