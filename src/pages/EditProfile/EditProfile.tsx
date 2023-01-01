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
import { useGetCitiesQuery } from '../../services/cities.service';
import { useGetHobbiesQuery } from '../../services/hobbies.service';
import {
  EditProfileRequest,
  useEditProfileMutation,
  useGetProfileQuery,
} from '../../services/profile.service';
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

const EditProfile: React.FC = () => {
  const { data: user } = useGetProfileQuery();
  const { data: cities } = useGetCitiesQuery();
  const { data: hobbies } = useGetHobbiesQuery();
  const [editProfile, { isLoading }] = useEditProfileMutation();
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
    if (user) {
      setEditData({
        name: user.profile.name,
        city_id: user.profile.location.city_id,
        height: user.profile.height,
        weight: user.profile.weight,
        bio: user.profile.bio,
        hobbies: user.profile.hobbies.map((hobby) => hobby.hobby_id),
      });

      setSelectedHobbies(user.profile.hobbies);
    }
  }, [user]);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

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

  return (
    <>
      <PageContent>
        <PhotoSection>
          <Header mb={1.5}>
            <p>Photo</p>
          </Header>
          <PhotoInputContainer>
            {[...Array(10)].map((_, i) => (
              <PhotoInput
                key={i}
                preview={user?.profile.photos[i]?.image_url}
                name="files"
                onChange={() => {}}
                deleteFile={() => {}}
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
                label={`About ${getFirstName(user?.profile.name || '')}`}
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
