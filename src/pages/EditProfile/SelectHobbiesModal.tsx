import React from 'react';
import styled from 'styled-components';
import Modal, { CloseModalBtn, ModalProps } from '../../components/Modal/Modal';
import colors from '../../styles/colors';
import { Hobby } from '../../types/profile';
import HobbyBadge from '../../components/HobbyBadge';
import { HobbiesContainer } from '../Register/HobbiesForm';

const StyledModal = styled(Modal)`
  ${CloseModalBtn} {
    display: none;
  }
`;

const DoneButton = styled.button`
  border: none;
  color: ${colors.primary};
  position: absolute;
  right: 0.5rem;
  top: 1.25rem;
  padding: 1rem;
  font-weight: 600;
  cursor: pointer;
`;

const Header = styled.div`
  border-bottom: 1px solid ${colors.gray20};
  padding: 1rem;
  font-weight: 700;
  font-size: 1.2rem;
  margin-bottom: 2rem;
  p {
    max-width: 1024px;
    margin: auto;
  }
`;

type Props = ModalProps & {
  hobbies?: Hobby[];
  selectedHobbies?: Hobby[];
  selectHobby: (hobby: Hobby) => void;
  unselectHobby: (hobby: Hobby) => void;
};

const SelectHobbiesModal: React.FC<Props> = ({
  show,
  closeModal,
  hobbies,
  selectedHobbies,
  selectHobby,
  unselectHobby,
}) => {
  const isSelected = (hobbyId: number) =>
    selectedHobbies?.some((hobby) => hobby.hobby_id === hobbyId);

  return (
    <StyledModal show={show} closeModal={closeModal}>
      <DoneButton onClick={closeModal}>DONE</DoneButton>
      <Header>
        <p>Hobbies</p>
      </Header>
      <HobbiesContainer>
        {hobbies?.map((hobby) => (
          <HobbyBadge
            key={hobby.hobby_id}
            hobby={hobby}
            onClick={
              isSelected(hobby.hobby_id)
                ? () => unselectHobby(hobby)
                : () => selectHobby(hobby)
            }
            active={isSelected(hobby.hobby_id)}
          />
        ))}
      </HobbiesContainer>
    </StyledModal>
  );
};

export default SelectHobbiesModal;
