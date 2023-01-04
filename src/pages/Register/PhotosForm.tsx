import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import {
  changeData,
  selectFormData,
  resetState,
} from '../../store/registerForm/registerFormSlice';
import styled, { css } from 'styled-components';
import colors from '../../styles/colors';
import PhotoInput from '../../components/PhotoInput';
import { ContinueButton } from '../../components/Button/ContinueButton';
import { useRegisterMutation } from '../../services/auth.service';
import { toast } from 'react-toastify';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { setAuth } from '../../store/auth/authSlice';

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

const SignUpBtnContainer = styled.div`
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  padding: 1rem;
  max-width: 450px;
  margin: 0 auto;
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
  const navigate = useNavigate();
  const formData = useAppSelector(selectFormData);
  const [previews, setPreviews] = useState<string[]>([]);
  const [register, { isLoading }] = useRegisterMutation();

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

  const handleSignUp: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append('name', formData.name);
    form.append('email', formData.email);
    form.append('password', formData.password);
    form.append('gender', '' + formData.gender!);
    form.append('birthdate', moment(formData.birthdate, 'YYYY-MM-DD').format());
    form.append('city_id', '' + formData.city_id!);
    formData.photos.forEach(({ file, caption }) => {
      form.append('files', file);
      form.append('captions', caption);
    });

    formData.hobby_ids?.forEach((hobbyId) => {
      form.append('hobby_ids', hobbyId.toString());
    });
    form.append('height', formData.height!.toString());
    form.append('weight', formData.weight!.toString());
    form.append('bio', formData.bio);

    try {
      const resp = await register(form).unwrap();
      toast(resp.message);
      dispatch(
        setAuth({
          token: resp.data.auth_token,
          user: {
            email: resp.data.email,
            role: resp.data.role,
            role_id: resp.data.role_id,
            user_id: resp.data.user_id,
          },
        }),
      );
      dispatch(resetState());
      navigate('/app', { replace: true });
    } catch (error: any) {
      toast.error(error.data.message, {
        theme: 'colored',
      });
    }
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
      <SignUpBtnContainer>
        <SignUpButton block disabled={formData.photos.length <= 0 || isLoading}>
          {isLoading ? 'PROCESSING...' : 'SIGN UP'}
        </SignUpButton>
      </SignUpBtnContainer>
    </form>
  );
};

export default PhotosForm;
