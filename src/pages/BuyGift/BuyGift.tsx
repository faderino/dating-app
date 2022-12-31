import React, { useEffect, useState } from 'react';
import { MdMessage, MdPerson } from 'react-icons/md';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { PrimaryButton } from '../../components/Button';
import PreviewGiftCard from '../../components/GiftCard/PreviewGiftCard';
import { Content } from '../../components/Layout';
import InputField from '../../components/InputField/InputField';
import Select from '../../components/Select';
import TextArea from '../../components/TextArea';
import {
  GiftVoucher,
  useGetGiftVouchersQuery,
} from '../../services/gifts.service';
import { useGetMatchesQuery } from '../../services/like.service';
import colors from '../../styles/colors';
import { compactCurrency } from '../../utils/format';
import { isEmpty } from '../../utils/validation';
import SelectRecipientModal from './SelectRecipientModal';
import useModal from '../../hooks/modal';
import { Profile } from '../../types/profile';

const PageContent = styled(Content)`
  @media screen and (min-width: 896px) {
    height: 100vh;
    display: flex;
    width: 100%;
  }
`;

const Preview = styled.div`
  @media screen and (min-width: 896px) {
    flex-basis: 50%;
  }
`;

const Form = styled.div`
  @media screen and (min-width: 896px) {
    flex-basis: 50%;
  }
`;

const Header = styled.div<{ mb?: number }>`
  border-bottom: 1px solid ${colors.gray20};
  padding: 1rem;
  font-weight: 700;
  font-size: 1.2rem;
  p {
    max-width: 1024px;
    margin: auto;
  }
  margin-bottom: ${(props) => props.mb}rem;
`;

const Container = styled.div`
  width: 95%;
  max-width: 1024px;
  margin: auto;
`;

const PreviewSection = styled.div`
  background-color: ${colors.gray10};
  padding: 1rem;
  margin-bottom: 2rem;
  @media screen and (min-width: 896px) {
    height: calc(100% - 54px);
    padding-top: 15rem;
  }
`;

const AddToBagButton = styled(PrimaryButton)`
  padding: 1rem;
  margin-bottom: 2rem;
`;

const SelectRecipient = styled.div`
  width: 100%;
  padding: 0.5rem 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const SelectedRecipient = styled.div`
  flex-basis: 60%;
  display: flex;
  align-items: center;
  color: ${colors.text};
  gap: 0.7rem;
  p {
    font-size: 1.1rem;
  }
`;

const SelectRecipientPlaceholder = styled.p`
  padding: 0.6rem 0;
`;

const RecipientPhoto = styled.div<{ img?: string }>`
  width: 2.5rem;
  aspect-ratio: 1;
  background-image: url(${(props) => props.img});
  background-position: 50% 50%;
  background-size: cover;
  background-repeat: no-repeat;
  background-color: ${colors.black};
  border-radius: 50%;
`;

const SelectMatchBtn = styled.button`
  border: none;
  font-size: 0.8rem;
  text-transform: uppercase;
  font-weight: 600;
  cursor: pointer;
  background-color: ${colors.gray20};
  color: ${colors.gray60};
  padding: 0.25rem;
  border-radius: 0.25rem;
  :hover {
    background-color: ${colors.gray30};
  }
`;

const BuyGift: React.FC = () => {
  const location = useLocation();
  const { data: giftVouchers } = useGetGiftVouchersQuery();
  const { data: matches } = useGetMatchesQuery();
  const [message, setMessage] = useState(
    'Hope you enjoy this Digidate Gift Card!',
  );
  const [selectedVoucher, setSelectedVoucher] = useState<
    GiftVoucher | undefined
  >(location.state?.voucher);
  const [selectedRecipient, setSelectedRecipient] = useState<Profile>(
    location.state?.recipient,
  );
  const [error, setError] = useState(
    {} as { voucher_id: string; message: string; recipient: string },
  );
  const { closeModal, openModal, showModal } = useModal();

  useEffect(() => {
    if (!selectedVoucher && giftVouchers) {
      setSelectedVoucher(
        giftVouchers?.find((voucher) => voucher.voucher_id === 2),
      );
    }
  }, [giftVouchers]);

  const handleChange: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    setSelectedVoucher(
      giftVouchers?.find((voucher) => voucher.voucher_id === +e.target.value),
    );
  };

  const onSelectRecipient = (recipient: Profile) => {
    setSelectedRecipient(recipient);
  };

  const validateForm = (): boolean => {
    setError({ voucher_id: '', message: '', recipient: '' });
    const currentError = {} as typeof error;
    if (!selectedVoucher) {
      currentError.voucher_id = 'Select voucher';
    }
    if (!selectedRecipient) {
      currentError.recipient = 'Select who you want to send this gift';
    }
    if (isEmpty(message)) {
      currentError.message = 'Write a message';
    }
    setError(currentError);
    return Boolean(Object.keys(currentError).length === 0);
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const valid = validateForm();
    if (!valid) return;
    console.log(message);
    console.log(selectedVoucher);
  };

  return (
    <>
      <PageContent>
        <Preview>
          <Header>
            <p>Preview</p>
          </Header>
          <PreviewSection>
            <PreviewGiftCard
              voucher={selectedVoucher}
              onBuy={() => {}}
              message={message}
              recipient={selectedRecipient}
            />
          </PreviewSection>
        </Preview>
        <Form>
          <Header mb={1.5}>
            <p>Buy Gift</p>
          </Header>
          <Container>
            <form onSubmit={handleSubmit}>
              <Select
                options={
                  giftVouchers?.map((voucher) => ({
                    value: voucher.voucher_id,
                    text: `IDR ${compactCurrency(voucher.amount)}`,
                  })) || []
                }
                label="Select Voucher"
                name="voucher_id"
                value={selectedVoucher?.voucher_id}
                error={error.voucher_id}
                onChange={handleChange}
              />
              <InputField
                label="To"
                error={error.recipient}
                hint="Changing will reset your Gift Bag."
                prepend={selectedRecipient ? null : <MdPerson size={28} />}
              >
                <SelectRecipient>
                  {selectedRecipient ? (
                    <SelectedRecipient>
                      <RecipientPhoto
                        img={selectedRecipient?.photos[0]?.image_url}
                      />
                      <p>{selectedRecipient?.name}</p>
                    </SelectedRecipient>
                  ) : (
                    <SelectRecipientPlaceholder>
                      Select recipient
                    </SelectRecipientPlaceholder>
                  )}
                  <SelectMatchBtn type="button" onClick={openModal}>
                    Select
                  </SelectMatchBtn>
                </SelectRecipient>
              </InputField>
              <TextArea
                label="Custom message"
                placeholder="Example bio..."
                type="text"
                name="message"
                value={message}
                error={error.message}
                rows={3}
                prepend={<MdMessage size={28} />}
                onChange={(e) => setMessage(e.target.value)}
              />
              <AddToBagButton block type="submit">
                ADD TO BAG
              </AddToBagButton>
            </form>
          </Container>
        </Form>
      </PageContent>
      <SelectRecipientModal
        show={showModal}
        closeModal={closeModal}
        matches={matches?.data}
        selectedRecipient={selectedRecipient}
        onSelectRecipient={onSelectRecipient}
      />
    </>
  );
};

export default BuyGift;
