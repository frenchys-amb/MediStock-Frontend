import React from 'react';
import BaseTable from './BaseTable';

const columns = [
  { Header: 'Medication', accessor: 'name' },
  { Header: 'Amount', accessor: 'amount' },
];

const Unit9Table = () => (
  <BaseTable tableName="unit9" columns={columns} />
);

export default Unit9Table;