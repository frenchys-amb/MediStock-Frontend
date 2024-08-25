import React from 'react';
import BaseTable from './BaseTable';

const columns = [
  { Header: 'Name', accessor: 'name' },
  { Header: 'Dose', accessor: 'dose' },
  { Header: 'Amount', accessor: 'amount' },
];

const MedicationTable = () => (
  <BaseTable tableName="medication" columns={columns} />
);

export default MedicationTable;
