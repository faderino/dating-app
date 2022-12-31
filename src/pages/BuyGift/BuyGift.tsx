import React, { useEffect, useState } from 'react';
import { MdMessage, MdPerson } from 'react-icons/md';
import { useLocation, useNavigate } from 'react-router-dom';
import PreviewGiftCard from '../../components/GiftCard/PreviewGiftCard';
import InputField from '../../components/InputField/InputField';
import Select from '../../components/Select';
import TextArea from '../../components/TextArea';
import {
  GiftVoucher,
  useGetGiftVouchersQuery,
} from '../../services/gifts.service';
import { useGetMatchesQuery } from '../../services/like.service';
import { compactCurrency } from '../../utils/format';
import { isEmpty } from '../../utils/validation';
import SelectRecipientModal from './SelectRecipientModal';
import useModal from '../../hooks/modal';
import { Profile } from '../../types/profile';
import {
  AddToBagButton,
  Container,
  Form,
  Header,
  PageContent,
  Preview,
  PreviewSection,
  RecipientPhoto,
  SelectedRecipient,
  SelectMatchBtn,
  SelectRecipient,
  SelectRecipientPlaceholder,
} from './style';
import Spinner from '../../components/Spinner/Spinner';
import { toast } from 'react-toastify';
import {
  addItem,
  GiftVoucherItem,
  selectGiftRecipient,
} from '../../store/giftBag/giftBagSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/store';

const BuyGift: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { data: giftVouchers } = useGetGiftVouchersQuery();
  const { data: matches } = useGetMatchesQuery();
  const giftBagRecipient = useAppSelector(selectGiftRecipient);
  const { closeModal, openModal, showModal } = useModal();
  const [loading, setLoading] = useState(false);

  const [selectedVoucher, setSelectedVoucher] = useState<
    GiftVoucher | undefined
  >(location.state?.voucher);
  const defaultRecipient = location.state?.recipient
    ? location.state.recipient
    : giftBagRecipient
    ? giftBagRecipient
    : undefined;
  const [selectedRecipient, setSelectedRecipient] =
    useState<Profile>(defaultRecipient);
  const [message, setMessage] = useState(
    'Hope you enjoy this Digidate Gift Card!',
  );
  const [error, setError] = useState(
    {} as { voucher_id: string; message: string; recipient: string },
  );

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

    const giftVoucherItem: GiftVoucherItem = {
      voucher_id: selectedVoucher!.voucher_id,
      amount: selectedVoucher!.amount,
      message: message,
    };

    setLoading(true);
    dispatch(addItem({ giftVoucherItem, recipient: selectedRecipient }));
    setTimeout(() => {
      setLoading(false);
      toast('Item added to bag');
      navigate('/app/gifts');
    }, 500);
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
                placeholder="Example message..."
                type="text"
                name="message"
                value={message}
                error={error.message}
                rows={3}
                prepend={<MdMessage size={28} />}
                onChange={(e) => setMessage(e.target.value)}
              />
              <AddToBagButton block type="submit" disabled={loading}>
                {loading ? <Spinner /> : 'ADD TO BAG'}
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
