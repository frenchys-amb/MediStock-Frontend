import React from 'react';
import BaseTable from './BaseTable';

const columns = [
  { Header: 'Name', accessor: 'name' },
  { Header: 'License', accessor: 'license' },
  { Header: 'Medication', accessor: 'medication' },
  { Header: 'Amount', accessor: 'amount' },
];

const FormUnit12 = () => (
  <BaseTable tableName="formunit12" columns={columns} />
);

export default FormUnit12;