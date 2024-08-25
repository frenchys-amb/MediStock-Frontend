import React from 'react';
import BaseTable from './BaseTable';

const columns = [
  { Header: 'Medication', accessor: 'name' },
  { Header: 'Amount', accessor: 'amount' },
];

const Unit2Table = () => (
  <BaseTable tableName="unit2" columns={columns} />
);

export default Unit2Table;