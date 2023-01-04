import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { PrimaryButton } from '../../components/Button';
import Modal, { ModalProps } from '../../components/Modal/Modal';
import Spinner from '../../components/Spinner/Spinner';
import {
  GoldProfileType,
  useGetGoldProfileTypesQuery,
  useSubscribeGoldMutation,
} from '../../services/profile.service';
import colors from '../../styles/colors';
import { formatCurrency } from '../../utils/format';

const StyledModal = styled(Modal)``;

const Header = styled.div`
  display: flex;
  font-size: 0.9rem;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  h1 {
    margin-bottom: 0.5rem;
  }
  p {
    color: ${colors.textSecondary};
  }
  margin-bottom: 2rem;
  @media screen and (min-width: 380px) {
    font-size: 1rem;
  }
`;

const TypeContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
  width: 90%;
  margin: 0 auto 2rem auto;
`;

const CheckoutButton = styled(PrimaryButton)`
  padding: 1rem;
  background-image: none;
  background-color: ${colors.gold};
  width: 100%;
  margin: 0 auto 1rem auto;
  display: block;
  @media screen and (min-width: 896px) {
    width: 50%;
  }
`;

type Props = ModalProps;

const SubscribeGoldModal: React.FC<Props> = ({ show, closeModal }) => {
  const { data: goldProfileTypes } = useGetGoldProfileTypesQuery();
  const [subscribeGold, { isLoading }] = useSubscribeGoldMutation();
  const [selectedType, setSelectedType] = useState<GoldProfileType>();

  useEffect(() => {
    if (goldProfileTypes) setSelectedType(goldProfileTypes[1]);
  }, []);

  const handleCheckout = async () => {
    try {
      await subscribeGold(selectedType!.gold_profile_type_id).unwrap();
      toast(`✅ Gold subscription added`);
      closeModal();
    } catch (error: any) {
      toast.error(error.data.message, { theme: 'colored' });
    }
  };

  return (
    <StyledModal show={show} closeModal={closeModal}>
      <Header>
        <h1>Get Digidate Gold</h1>
        <p>✨ Unlimited Likes, Spotlight & More! ✨</p>
      </Header>
      <TypeContainer>
        {goldProfileTypes?.map((type) => (
          <GoldProfileTypeItem
            key={type.gold_profile_type_id}
            type={type}
            onClick={() => setSelectedType(type)}
            active={
              selectedType?.gold_profile_type_id === type.gold_profile_type_id
            }
          />
        ))}
      </TypeContainer>
      <CheckoutButton onClick={handleCheckout} disabled={isLoading}>
        {isLoading ? <Spinner /> : 'CHECKOUT'}
      </CheckoutButton>
    </StyledModal>
  );
};

export default SubscribeGoldModal;

const GoldProfileTypeContainer = styled.div<{ active?: boolean }>`
  border: 4px solid ${(props) => (props.active ? colors.gold : colors.gray20)};
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  user-select: none;
  cursor: pointer;
  p {
    color: ${colors.textSecondary};
    font-weight: 700;
  }
`;

const GoldProfileTypeItem: React.FC<{
  type: GoldProfileType;
  active?: boolean;
  onClick: () => void;
}> = ({ type, active, onClick }) => {
  const savePercent = () => {
    const base = 5000 * type.duration;
    return Math.round(((base - type.price) / base) * 100);
  };
  return (
    <GoldProfileTypeContainer active={active} onClick={onClick}>
      <h1>
        {type.duration} {type.duration > 1 ? 'days' : 'day'}
      </h1>
      <p>IDR {formatCurrency(type.price)}</p>
      <span style={{ opacity: savePercent() ? 1 : 0 }}>
        Save {savePercent()}%
      </span>
    </GoldProfileTypeContainer>
  );
};
