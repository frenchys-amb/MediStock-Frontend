import React from 'react';
import BaseTable from './BaseTable';

const columns = [
  { Header: 'Name', accessor: 'name' },
  { Header: 'Amount', accessor: 'amount' },
  { Header: 'User ID', accessor: 'user_id' },
];

const StorageTable = () => (
  <BaseTable tableName="storage" columns={columns} />
);

export default StorageTable;
