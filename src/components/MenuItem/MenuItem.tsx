import styled from 'styled-components';
import colors from '../../styles/colors';

export const MenuTitle = styled.div`
  text-transform: uppercase;
  font-weight: 500;
  padding: 0.5rem 1rem;
  font-size: 0.8rem;
  letter-spacing: 1px;
`;

type Props = {
  border?: 'top' | 'bottom' | 'y';
};

const MenuItem = styled.div<Props>`
  padding: 1rem;
  background-color: ${colors.white};
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: ${(props) =>
    props.border === 'y' || props.border === 'top'
      ? `1px solid ${colors.gray20}`
      : 'none'};
  border-bottom: ${(props) =>
    props.border === 'y' || props.border === 'bottom'
      ? `1px solid ${colors.gray20}`
      : 'none'};
`;

export const MenuItemTitle = styled.div`
  text-transform: capitalize;
`;

export const MenuItemValue = styled.div`
  max-width: 55%;
  text-overflow: ellipsis;
  overflow: hidden;
  color: ${colors.textSecondary};
  font-size: 0.95rem;
`;

export const MenuItemSelect = styled.div`
  transition: color 0.3s ease;
  :hover {
    color: ${colors.primary};
  }
`;

export default MenuItem;
