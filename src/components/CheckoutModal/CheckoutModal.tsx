import React, { useState } from 'react';
import { MdSend } from 'react-icons/md';
import styled from 'styled-components';
import colors from '../../styles/colors';
import { PrimaryButton } from '../Button';
import InputField from '../InputField/InputField';
import Modal, {
  CloseModalBtn,
  ModalContent,
  ModalProps,
  scaleUp,
} from '../Modal/Modal';
import Spinner from '../Spinner/Spinner';

const StyledModal = styled(Modal)`
  ${ModalContent} {
    animation: ${scaleUp} 2s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
  }
  ${CloseModalBtn} {
    color: ${colors.text};
    border: none;
  }
`;

const Container = styled.div`
  text-align: center;
  margin-bottom: 2rem;
  @media screen and (min-width: 896px) {
    padding: 0 5rem 2rem 5rem;
  }
`;

const Title = styled.div`
  & > h1 {
    font-size: 2rem;
  }
  & > p {
    font-size: 1.5rem;
    span {
      display: inline-block;
      padding: 0 0.75rem 0 0.5rem;
      color: ${colors.white};
      background-image: ${colors.gradient};
      line-height: 1.5;
      transform: skew(15deg, 0deg);
      margin-left: 0.5rem;
    }
  }
  font-weight: 700;
  text-transform: uppercase;
  font-style: italic;
  margin: 2rem 0 3rem 0;
  font-family: 'Atyp Display';
`;

const ActionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-bottom: 2rem;
  gap: 1rem;
`;

const PayButton = styled(PrimaryButton)`
  text-transform: uppercase;
  display: flex;
  gap: 1rem;
  padding: 1rem 2rem;
  span {
    font-size: 1.2rem;
  }
`;

type Props = ModalProps & {
  children?: React.ReactNode;
  totalCost: number;
  onCheckout: (payAmount: number) => void;
  isLoading: boolean;
};

const CheckoutModal: React.FC<Props> = ({
  show,
  closeModal,
  children,
  totalCost,
  onCheckout,
  isLoading,
}) => {
  const [payAmount, setPayAmount] = useState<number>();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    if (!payAmount) {
      return setError('Enter pay amount');
      setLoading(false);
    }
    if (payAmount !== totalCost) {
      return setError('Enter correct pay amount');
      setLoading(false);
    }
    setTimeout(() => {
      setLoading(false);
      onCheckout(payAmount);
    }, 2000);
  };

  return (
    <StyledModal show={show} closeModal={closeModal}>
      <Container>
        <Title>
          <h1>CHECKOUT</h1>
        </Title>
        {children}
      </Container>
      <form onSubmit={handleSubmit}>
        <ActionContainer>
          <InputField
            label="Pay Amount"
            placeholder="Pay amount..."
            type="number"
            value={payAmount ?? ''}
            error={error}
            hint="Enter amount according to total."
            prepend="IDR"
            onChange={(e) => setPayAmount(+e.target.value)}
          />
          <PayButton disabled={loading}>
            {loading || isLoading ? (
              <>
                <Spinner />
                PROCESSING...
              </>
            ) : (
              <>
                <MdSend />
                <p>PAY</p>
              </>
            )}
          </PayButton>
        </ActionContainer>
      </form>
    </StyledModal>
  );
};

export default CheckoutModal;
