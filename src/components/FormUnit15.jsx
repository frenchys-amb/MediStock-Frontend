import React from 'react';
import BaseTable from './BaseTable';

const columns = [
  { Header: 'Name', accessor: 'name' },
  { Header: 'License', accessor: 'license' },
  { Header: 'Medication', accessor: 'medication' },
  { Header: 'Amount', accessor: 'amount' },
];

const FormUnit15 = () => (
  <BaseTable tableName="formunit15" columns={columns} />
);

export default FormUnit15;