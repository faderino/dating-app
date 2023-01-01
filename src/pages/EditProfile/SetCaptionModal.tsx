import React, { useEffect, useRef, useState } from 'react';
import { FaClosedCaptioning } from 'react-icons/fa';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { PrimaryButton } from '../../components/Button';
import Modal, { ModalProps } from '../../components/Modal/Modal';
import Spinner from '../../components/Spinner/Spinner';
import TextArea from '../../components/TextArea';
import { useSetCaptionMutation } from '../../services/photo.service';
import colors from '../../styles/colors';
import { Photo } from '../../types/profile';

const StyledModal = styled(Modal)``;

const SaveButton = styled(PrimaryButton)`
  padding: 1rem 2rem;
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

const SetCaptionContent = styled.div`
  padding: 1rem;
`;

const PhotoPreview = styled.div<{ img?: string }>`
  background-image: url(${(props) => props.img});
  background-color: ${colors.black};
  background-position: 50% 50%;
  background-size: cover;
  background-repeat: no-repeat;
  width: 250px;
  aspect-ratio: 2/3;
  border-radius: 0.5rem;
  margin: 0 auto;
`;

type Props = ModalProps & {
  photo?: Photo;
};

const SetCaptionModal: React.FC<Props> = ({ show, closeModal, photo }) => {
  const inputRef = useRef() as React.MutableRefObject<HTMLTextAreaElement>;
  const [setCaptionMutation, { isLoading }] = useSetCaptionMutation();
  const [caption, setCaption] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (photo) setCaption(photo.caption);
  }, [photo]);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (caption && caption.length < 10) {
      return setError('Minimum 10 characters');
    }
    try {
      await setCaptionMutation({ photoId: photo!.photo_id, caption }).unwrap();
      toast('Success set caption');
      closeModal();
    } catch (error: any) {
      toast.error(error.data.message, { theme: 'colored' });
    }
  };

  return (
    <StyledModal show={show} closeModal={closeModal}>
      <Header>
        <p>Set Caption</p>
      </Header>
      <SetCaptionContent>
        <PhotoPreview img={photo?.image_url} />
        <SetCaptionForm
          caption={caption}
          onSubmit={handleSubmit}
          onChange={(e) => setCaption(e.target.value)}
          error={error}
          loading={isLoading}
        />
      </SetCaptionContent>
    </StyledModal>
  );
};

export default SetCaptionModal;

const FormAction = styled.div`
  display: flex;
  justify-content: end;
`;

type SetCaptionFormProps = {
  caption: string;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
  error: string;
  loading: boolean;
};

const SetCaptionForm: React.FC<SetCaptionFormProps> = ({
  onSubmit,
  onChange,
  caption,
  error,
  loading,
}) => {
  const inputRef = useRef() as React.MutableRefObject<HTMLTextAreaElement>;

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <form onSubmit={onSubmit}>
      <TextArea
        ref={inputRef}
        placeholder="Example caption..."
        type="text"
        name="caption"
        value={caption}
        error={error}
        rows={3}
        prepend={<FaClosedCaptioning size={28} />}
        onChange={onChange}
      />
      <FormAction>
        <SaveButton disabled={loading}>
          {loading ? <Spinner /> : 'SAVE'}
        </SaveButton>
      </FormAction>
    </form>
  );
};
