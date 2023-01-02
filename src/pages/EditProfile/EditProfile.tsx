import React, { useEffect, useRef, useState } from 'react';
import {
  MdHeight,
  MdLocationOn,
  MdMonitorWeight,
  MdPersonSearch,
} from 'react-icons/md';
import { FaClosedCaptioning } from 'react-icons/fa';
import { toast } from 'react-toastify';
import InputField from '../../components/InputField/InputField';
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
import { Hobby, Photo } from '../../types/profile';
import { getFirstName } from '../../utils/format';
import { isEmpty } from '../../utils/validation';
import SelectHobbiesModal from './SelectHobbiesModal';
import SetCaptionModal from './SetCaptionModal';
import {
  AddCaptionButton,
  CurrentHobbies,
  EditDataSection,
  FormContainer,
  Header,
  PageContent,
  PhotoInputContainer,
  PhotoInputOverlay,
  PhotoSection,
  SaveButton,
  SelectHobbies,
  SelectHobbiesBtn,
  ToastImageUpload,
} from './style';

const EditProfile: React.FC = () => {
  const { refetch } = useGetProfileQuery();
  const { data: cities } = useGetCitiesQuery();
  const { data: hobbies } = useGetHobbiesQuery();
  const profile = useAppSelector(selectProfile);
  const [editProfile, { isLoading }] = useEditProfileMutation();
  const [uploadPhoto] = useAddPhotoMutation();
  const [removePhoto] = useRemovePhotoMutation();
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
  const {
    closeModal: closeCaptionModal,
    openModal: openCaptionModal,
    showModal: showCaptionModal,
  } = useModal();
  const [selectedPhoto, setSelectedPhoto] = useState<Photo>();

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

  const toEditCaption = (photo?: Photo) => {
    setSelectedPhoto(photo);
    openCaptionModal();
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
              <PhotoInputOverlay key={i}>
                <PhotoInput
                  preview={profile?.photos[i]?.image_url}
                  name="files"
                  onChange={addPhoto}
                  deleteFile={() => deletePhoto(profile!.photos[i].photo_id)}
                />
                {profile?.photos[i]?.image_url && (
                  <AddCaptionButton
                    onClick={() => toEditCaption(profile.photos[i])}
                  >
                    <FaClosedCaptioning size={24} color={colors.black} />
                  </AddCaptionButton>
                )}
              </PhotoInputOverlay>
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
      <SetCaptionModal
        show={showCaptionModal}
        closeModal={closeCaptionModal}
        photo={selectedPhoto}
      />
    </>
  );
};

export default EditProfile;
