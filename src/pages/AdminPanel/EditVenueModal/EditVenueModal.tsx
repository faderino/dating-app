import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import InputField from '../../../components/InputField/InputField';
import { ModalProps } from '../../../components/Modal';
import Modal, { CloseModalBtn } from '../../../components/Modal/Modal';
import Select from '../../../components/Select';
import Spinner from '../../../components/Spinner/Spinner';
import {
  UpdateVenueRequest,
  useUpdateVenueMutation,
  Venue,
} from '../../../services/venue.service';
import colors from '../../../styles/colors';
import { City } from '../../../types/location';
import { SaveButton } from '../../EditProfile/style';

const StyledModal = styled(Modal)`
  ${CloseModalBtn} {
    color: ${colors.text};
    border: none;
  }
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

const FormContainer = styled.form`
  max-width: 500px;
  margin: 0 auto;
  width: 90%;
`;

type Props = ModalProps & {
  venue?: Venue;
  cities: City[];
};

const EditVenueModal: React.FC<Props> = ({
  show,
  closeModal,
  venue,
  cities,
}) => {
  const [updateVenue, { isLoading }] = useUpdateVenueMutation();
  const [editData, setEditData] = useState({
    name: '',
    address: '',
    city_id: 0,
    available: 0,
  });
  const [errors, setErrors] = useState({} as Record<string, string>);

  useEffect(() => {
    if (venue) {
      setEditData({
        name: venue.name,
        address: venue.address,
        city_id: venue.city_id,
        available: venue.available ? 1 : 0,
      });
    }
  }, [venue]);

  const validateForm = (): boolean => {
    setErrors({
      name: '',
      address: '',
      city_id: '',
      available: '',
    });
    const currentErrors = {} as typeof errors;
    if (!editData.name) {
      currentErrors.name = 'Enter venue name';
    }
    if (!editData.address) {
      currentErrors.address = 'Enter venue address';
    }
    setErrors(currentErrors);
    return Boolean(Object.keys(currentErrors).length === 0);
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const valid = validateForm();
    if (!valid) return;
    const updateVenueRequest: UpdateVenueRequest = {
      venueId: venue!.venue_id,
      name: editData.name,
      address: editData.address,
      city_id: editData.city_id,
      available: editData.available === 1 ? true : false,
    };
    console.log(updateVenueRequest);
    try {
      const resp = await updateVenue(updateVenueRequest).unwrap();
      toast('✅ ' + resp.message);
      closeModal();
    } catch (error: any) {
      toast.error(error.data.message, { theme: 'colored' });
    }
  };

  const handleChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLSelectElement
  > = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  return (
    <StyledModal show={show} closeModal={closeModal}>
      <Header>
        <p>Edit Venue</p>
      </Header>
      <FormContainer onSubmit={handleSubmit}>
        <InputField
          label="Venue name"
          placeholder="Venue name"
          type="text"
          name="name"
          value={editData.name}
          error={errors.name}
          onChange={handleChange}
        />
        <InputField
          label="Address"
          placeholder="Address"
          type="text"
          name="name"
          value={editData.address}
          error={errors.address}
          onChange={handleChange}
        />
        <Select
          options={cities.map((city) => ({
            value: city.city_id,
            text: city.name,
          }))}
          label="Select City"
          name="city_id"
          placeholder="Select city..."
          value={editData.city_id}
          error={errors.city_id}
          onChange={handleChange}
        />
        <Select
          options={[
            {
              value: 1,
              text: 'Available',
            },
            {
              value: 0,
              text: 'Unavailable',
            },
          ]}
          label="Set availability"
          name="available"
          placeholder="Set availability."
          value={editData.available}
          error={errors.available}
          onChange={handleChange}
        />
        <SaveButton block type="submit">
          {isLoading ? <Spinner /> : 'SAVE'}
        </SaveButton>
      </FormContainer>
    </StyledModal>
  );
};

export default EditVenueModal;
