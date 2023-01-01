import React, { useEffect, useRef, useState } from 'react';
import {
  MdHeight,
  MdLocationOn,
  MdMonitorWeight,
  MdPersonSearch,
} from 'react-icons/md';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { PrimaryButton } from '../../components/Button';
import InputField from '../../components/InputField/InputField';
import { Content } from '../../components/Layout';
import PhotoInput from '../../components/PhotoInput';
import Select from '../../components/Select';
import Spinner from '../../components/Spinner/Spinner';
import TextArea from '../../components/TextArea';
import useModal from '../../hooks/modal';
import { useAppSelector } from '../../hooks/store';
import { useGetCitiesQuery } from '../../services/cities.service';
import { useGetHobbiesQuery } from '../../services/hobbies.service';
import {
  useAddPhotoMutation,
  useRemovePhotoMutation,
} from '../../services/photo.service';
import {
  EditProfileRequest,
  useEditProfileMutation,
  useGetProfileQuery,
} from '../../services/profile.service';
import { selectProfile } from '../../store/profile/profileSlice';
import colors from '../../styles/colors';
import { Hobby } from '../../types/profile';
import { getFirstName } from '../../utils/format';
import { isEmpty } from '../../utils/validation';
import { SelectMatchBtn } from '../BuyGift/style';
import SelectHobbiesModal from './SelectHobbiesModal';

const PageContent = styled(Content)`
  @media screen and (min-width: 896px) {
    height: 100vh;
    display: flex;
    width: 100%;
  }
`;

const PhotoSection = styled.div`
  @media screen and (min-width: 896px) {
    flex-basis: 50%;
  }
`;

const EditDataSection = styled.div`
  @media screen and (min-width: 896px) {
    flex-basis: 50%;
    form {
      max-width: 500px;
      margin: 0 auto;
    }
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
  @media screen and (min-width: 896px) {
    p {
      text-align: center;
    }
  }
`;

const PhotoInputContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  margin: 0 auto;
  width: 90%;
  max-width: 650px;
  gap: 0.75rem;
  & > div {
    flex: 0 1 30%;
  }
`;

const FormContainer = styled.div`
  width: 95%;
  max-width: 1024px;
  margin: auto;
  form {
    padding-bottom: 5rem;
  }
`;

const SelectHobbies = styled.div`
  width: 100%;
  padding: 0.5rem 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CurrentHobbies = styled.div`
  padding: 0.5rem;
  color: ${colors.text};
`;

const SelectHobbiesBtn = styled(SelectMatchBtn)``;

const SaveButton = styled(PrimaryButton)`
  padding: 1rem;
  margin-top: 1rem;
`;

const ToastImageUpload = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  img {
    width: 40px;
    height: 40px;
    object-fit: cover;
    object-position: 50% 50%;
  }
`;

const EditProfile: React.FC = () => {
  const { refetch } = useGetProfileQuery();
  const { data: cities } = useGetCitiesQuery();
  const { data: hobbies } = useGetHobbiesQuery();
  const profile = useAppSelector(selectProfile);
  const [editProfile, { isLoading }] = useEditProfileMutation();
  const [uploadPhoto] = useAddPhotoMutation();
  const [removePhoto, { isLoading: deleteLoading }] = useRemovePhotoMutation();
  const inputRef = useRef() as React.MutableRefObject<HTMLTextAreaElement>;
  const [editData, setEditData] = useState<EditProfileRequest>(
    {} as EditProfileRequest,
  );
  const [selectedHobbies, setSelectedHobbies] = useState<Hobby[]>([]);
  const [errors, setErrors] = useState({
    name: '',
    city_id: '',
    height: '',
    weight: '',
    bio: '',
    hobbies: '',
  });
  const { closeModal, openModal, showModal } = useModal();

  useEffect(() => {
    inputRef.current.focus();
    refetch();
  }, []);

  useEffect(() => {
    if (profile) {
      setEditData({
        name: profile.name,
        city_id: profile.location.city_id,
        height: profile.height,
        weight: profile.weight,
        bio: profile.bio,
        hobbies: profile.hobbies.map((hobby) => hobby.hobby_id),
      });

      setSelectedHobbies(profile.hobbies);
    }
  }, [profile]);

  useEffect(() => {
    setEditData({
      ...editData,
      hobbies: selectedHobbies.map((hobby) => hobby.hobby_id),
    });
  }, [selectedHobbies]);

  const handleChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  > = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const selectHobby = (hobby: Hobby) => {
    setSelectedHobbies([...selectedHobbies, hobby]);
  };

  const unselectHobby = (hobby: Hobby) => {
    setSelectedHobbies(
      selectedHobbies.filter((h) => h.hobby_id !== hobby.hobby_id),
    );
  };

  const validateForm = (): boolean => {
    setErrors({
      name: '',
      city_id: '',
      height: '',
      weight: '',
      bio: '',
      hobbies: '',
    });
    const currentErrors = {} as typeof errors;
    if (isEmpty(editData.name)) {
      currentErrors.name = 'Please enter your name';
    }
    if (isEmpty(editData.city_id)) {
      currentErrors.city_id = 'Select your city';
    }
    if (isEmpty(editData.height)) {
      currentErrors.height = 'Please enter your height';
    }
    if (isEmpty(editData.weight)) {
      currentErrors.weight = 'Please enter your weight';
    }
    if (isEmpty(editData.bio)) {
      currentErrors.bio = 'Write something about yourself';
    }
    if (selectedHobbies.length === 0) {
      currentErrors.hobbies = 'Pick atleast 1 hobby';
    }
    setErrors(currentErrors);
    return Boolean(Object.keys(currentErrors).length === 0);
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const valid = validateForm();
    if (!valid) return;
    try {
      await editProfile(editData).unwrap();
      toast('✅ Success edit data');
    } catch (error: any) {
      toast.error(error.data.message, { theme: 'colored' });
    }
  };

  const addPhoto: React.ChangeEventHandler<HTMLInputElement> = async (e) => {
    e.preventDefault();
    console.log(e.target.files?.[0]);
    const formData = new FormData();
    formData.append('file', e.target.files![0]);
    formData.append('caption', '');
    try {
      const resp = await uploadPhoto(formData).unwrap();
      toast(
        <ToastImageUpload>
          <img src={resp.data.image_url} alt="profile" />
          <p>Add photo success.</p>
        </ToastImageUpload>,
      );
    } catch (error: any) {
      toast.error(error.data.message, { theme: 'colored' });
    }
  };

  const deletePhoto = async (photoId: number) => {
    if (profile?.photos.length === 1) {
      toast.error('Minimum one photo', { theme: 'colored' });
      return;
    }
    try {
      await removePhoto(photoId).unwrap();
      toast('Photo deleted');
    } catch (error: any) {
      toast.error(error.data.message, { theme: 'colored' });
    }
  };

  return (
    <>
      <PageContent>
        <PhotoSection>
          <Header mb={1.5}>
            <p>Edit Photo</p>
          </Header>
          <PhotoInputContainer>
            {[...Array(10)].map((_, i) => (
              <PhotoInput
                key={i}
                preview={profile?.photos[i]?.image_url}
                name="files"
                onChange={addPhoto}
                deleteFile={() => deletePhoto(profile!.photos[i].photo_id)}
              />
            ))}
          </PhotoInputContainer>
        </PhotoSection>
        <EditDataSection>
          <Header mb={1.5}>
            <p>Edit Profile</p>
          </Header>
          <FormContainer>
            <form onSubmit={handleSubmit}>
              <TextArea
                ref={inputRef}
                label={`About ${getFirstName(profile?.name || '')}`}
                placeholder="Example bio..."
                type="text"
                name="bio"
                value={editData.bio}
                error={errors.bio}
                prepend={<MdPersonSearch size={28} />}
                onChange={handleChange}
              />
              <Select
                options={
                  cities?.map((city) => ({
                    value: city.city_id,
                    text: city.name,
                  })) || []
                }
                label="Your City"
                name="city_id"
                value={editData.city_id}
                error={errors.city_id}
                prepend={<MdLocationOn size={28} />}
                onChange={handleChange}
              />
              <InputField
                label="Your Attributes"
                placeholder="Height"
                type="number"
                name="height"
                value={editData.height ?? ''}
                error={errors.height}
                hint="Your height in centimeters (cm)."
                prepend={<MdHeight size={28} />}
                append="cm"
                onChange={handleChange}
              />
              <InputField
                placeholder="Weight"
                type="number"
                name="weight"
                value={editData.weight ?? ''}
                error={errors.weight}
                hint="Your height in kilograms (kg)."
                prepend={<MdMonitorWeight size={28} />}
                append="kg"
                onChange={handleChange}
              />
              <InputField label="Your Hobbies" error={errors.hobbies}>
                <SelectHobbies>
                  <CurrentHobbies>
                    {selectedHobbies?.map((hobby) => hobby.title).join(', ')}
                  </CurrentHobbies>
                  <SelectHobbiesBtn type="button" onClick={openModal}>
                    Select
                  </SelectHobbiesBtn>
                </SelectHobbies>
              </InputField>
              <SaveButton block type="submit" disabled={isLoading}>
                {isLoading ? <Spinner /> : 'SAVE'}
              </SaveButton>
            </form>
          </FormContainer>
        </EditDataSection>
      </PageContent>
      <SelectHobbiesModal
        show={showModal}
        closeModal={closeModal}
        hobbies={hobbies?.data}
        selectedHobbies={selectedHobbies}
        selectHobby={selectHobby}
        unselectHobby={unselectHobby}
      />
    </>
  );
};

export default EditProfile;
