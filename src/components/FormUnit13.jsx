import React from 'react';
import BaseTable from './BaseTable';

const columns = [
  { Header: 'Name', accessor: 'name' },
  { Header: 'License', accessor: 'license' },
  { Header: 'Medication', accessor: 'medication' },
  { Header: 'Amount', accessor: 'amount' },
];

const FormUnit13 = () => (
  <BaseTable tableName="formunit13" columns={columns} />
);

export default FormUnit13;