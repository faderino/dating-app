import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import {
  changeData,
  selectFormData,
} from '../../store/registerForm/registerFormSlice';
import styled, { css } from 'styled-components';
import colors from '../../styles/colors';
import PhotoInput from '../../components/PhotoInput';
import { ContinueButton } from '../../components/Button/ContinueButton';

const FormTitle = styled.h1`
  margin-bottom: 1rem;
`;

const FormInfo = styled.p`
  color: ${colors.textSecondary};
  font-size: 0.9rem;
  margin-bottom: 3rem;
`;

const PhotoInputContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.75rem;
  & > div {
    flex: 0 1 30%;
  }
`;

const SignUpButton = styled(ContinueButton)<{ disabled?: boolean }>`
  margin-top: 4rem;
  ${(props) =>
    props.disabled &&
    css`
      background-image: none;
      color: ${colors.gray40};
      background-color: ${colors.gray20};
    `}
`;

const PhotosForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const formData = useAppSelector(selectFormData);
  const [previews, setPreviews] = useState<string[]>([]);

  useEffect(() => {
    if (formData.photos.length <= 0) {
      setPreviews([]);
      return;
    }
    const objectUrls = formData.photos.map((photo) =>
      URL.createObjectURL(photo.file),
    );
    setPreviews(objectUrls);
    return () => {
      objectUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [formData.photos]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      changeData({
        photos: [
          ...formData.photos,
          {
            file: e.target.files?.[0],
            caption: '',
          },
        ],
      }),
    );
  };

  const handleSignUp: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  const deleteFile = (fileIndex: number) => {
    dispatch(
      changeData({ photos: formData.photos.filter((_, i) => i !== fileIndex) }),
    );
  };

  return (
    <form onSubmit={handleSignUp}>
      <FormTitle>Add Photos</FormTitle>
      <FormInfo>Add at least 1 photo to continue</FormInfo>
      <PhotoInputContainer>
        {[...Array(10)].map((_, i) => (
          <PhotoInput
            key={i}
            preview={previews[i]}
            name="files"
            onChange={handleChange}
            deleteFile={() => deleteFile(i)}
          />
        ))}
      </PhotoInputContainer>
      <SignUpButton block disabled={formData.photos.length <= 0}>
        SIGN UP
      </SignUpButton>
    </form>
  );
};

export default PhotosForm;
