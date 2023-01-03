import styled, { css } from 'styled-components';
import colors from '../../../../styles/colors';

export const StyledTable = styled.table<{ headers: string[] }>`
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  @media screen and (max-width: 768px) {
    thead {
      display: none;
    }
    th,
    tr,
    td {
      display: block;
      border: none;
      border-bottom: 1px solid ${colors.gray40};
    }
    tr {
      margin-bottom: 1rem;
    }
    td {
      text-align: right;
    }
    td::before {
      float: left;
      content: 'Header';
      font-weight: bold;
      color: ${colors.text};
    }
    ${({ headers }) =>
      headers.map(
        (header, i) => css`
          td:nth-of-type(${i + 1})::before {
            content: '${header}';
          }
        `,
      )}
  }
`;

export const TableHeader = styled.thead`
  & th {
    padding: 1rem;
    font-weight: 700;
    font-size: 1rem;
    border: 1px solid ${colors.gray40};
  }
`;

export const TableRow = styled.tr`
  :nth-child(odd) {
    background-color: ${colors.gray10};
  }
`;

export const TableRowData = styled.td<{ center?: boolean }>`
  padding: 0.5rem 1rem;
  font-weight: 400;
  color: ${colors.textSecondary};
  border: 1px solid ${colors.gray40};
  border-width: 3px 1px;
  text-align: ${({ center }) => (center ? 'center' : 'left')};
`;
