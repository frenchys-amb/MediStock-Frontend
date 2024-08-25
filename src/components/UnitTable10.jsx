import React from 'react';
import BaseTable from './BaseTable';

const columns = [
  { Header: 'Medication', accessor: 'name' },
  { Header: 'Amount', accessor: 'amount' },
];

const Unit10Table = () => (
  <BaseTable tableName="unit10" columns={columns} />
);

export default Unit10Table;