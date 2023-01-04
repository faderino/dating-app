import React from 'react';
import { StyledTable, TableHeader } from './style';

type Props = {
  headers: string[];
  loading?: boolean;
  children?: React.ReactNode;
};

const Table: React.FC<Props> = ({ headers, children }) => {
  return (
    <StyledTable headers={headers}>
      <TableHeader>
        <tr>
          {headers.map((header) => (
            <th key={header}>{header}</th>
          ))}
        </tr>
      </TableHeader>
      <tbody>{children}</tbody>
    </StyledTable>
  );
};

export default Table;
