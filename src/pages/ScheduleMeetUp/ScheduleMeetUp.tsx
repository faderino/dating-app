import React, { useState } from 'react';
import { MdDateRange, MdPerson } from 'react-icons/md';
import styled from 'styled-components';
import InputField from '../../components/InputField/InputField';
import { Content } from '../../components/Layout';
import useModal from '../../hooks/modal';
import { useGetMatchesQuery } from '../../services/like.service';
import colors from '../../styles/colors';
import { Profile } from '../../types/profile';
import {
  SelectRecipient,
  SelectedRecipient,
  RecipientPhoto,
  SelectRecipientPlaceholder,
  SelectMatchBtn,
} from '../BuyGift/style';
import SelectRecipientModal from '../BuyGift/SelectRecipientModal';
import Select from '../../components/Select';
import { FaCalendarDay, FaClock } from 'react-icons/fa';
import { PrimaryButton } from '../../components/Button';
import { useLocation, useNavigate } from 'react-router-dom';
import { isEmpty } from '../../utils/validation';
import moment from 'moment';

const PageContent = styled(Content)`
  @media screen and (min-width: 896px) {
    height: 100vh;
    display: flex;
    flex-direction: row-reverse;
    width: 100%;
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

const Section = styled.div`
  @media screen and (min-width: 896px) {
    flex-basis: 50%;
  }
`;

const VenueSection = styled(Section)``;

const FormSection = styled(Section)``;

const FormContainer = styled.form`
  max-width: 500px;
  margin: 0 auto;
  width: 90%;
`;

const TimePicker = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  div {
    flex-basis: 50%;
  }
`;

const ScheduleMeetupBtn = styled(PrimaryButton)`
  margin: 2rem 0;
  background-image: none;
  background-color: ${colors.text};
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;

const SelectMatch = styled(SelectRecipient)``;

const SelectedMatch = styled(SelectedRecipient)``;

const MatchPhoto = styled(RecipientPhoto)``;

const SelectedMatchPlaceholder = styled(SelectRecipientPlaceholder)``;

const hours = [...Array(24)].map((_, n) => n.toString().padStart(2, '0'));
const minutes = [...Array(60)].map((_, n) => n.toString().padStart(2, '0'));

const ScheduleMeetUp: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { data: matches } = useGetMatchesQuery();
  const [selectedMatch, setSelectedMatch] = useState<Profile>(
    location.state?.match,
  );
  const { closeModal, openModal, showModal } = useModal();
  const currentDate = new Date(Date.now());
  const [meetUpSchedule, setMeetupSchedule] = useState({
    date: `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`,
    time: {
      hour: currentDate.getHours().toString(),
      minute: currentDate.getMinutes().toString(),
    },
  });
  const [errors, setErrors] = useState({
    match: '',
    date: '',
    hour: '',
    minute: '',
  });

  const onSelectMatch = (match: Profile) => {
    setSelectedMatch(match);
  };

  const validateForm = (): boolean => {
    setErrors({ match: '', date: '', hour: '', minute: '' });
    const currentError = {} as typeof errors;
    if (!selectedMatch) {
      currentError.match = 'Select partner';
    }
    const schedule = `${meetUpSchedule.date}T${meetUpSchedule.time.hour}:${meetUpSchedule.time.minute}:00Z`;
    if (moment(schedule) < moment()) {
      currentError.date = 'Incorrect time';
      currentError.hour = 'Incorrect time';
      currentError.minute = 'Incorrect time';
    }
    if (isEmpty(meetUpSchedule.date)) {
      currentError.date = 'Choose date';
    }
    if (isEmpty(meetUpSchedule.time.hour)) {
      currentError.hour = 'Choose hour';
    }
    if (isEmpty(meetUpSchedule.time.minute)) {
      currentError.minute = 'Choose minute';
    }
    setErrors(currentError);
    return Boolean(Object.keys(currentError).length === 0);
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const valid = validateForm();
    if (!valid) return;
    console.log(selectedMatch);
    console.log(meetUpSchedule);
    const schedule = `${meetUpSchedule.date}T${meetUpSchedule.time.hour}:${meetUpSchedule.time.minute}:00Z`;
    console.log(schedule);
  };

  return (
    <>
      <PageContent>
        <FormSection>
          <Header mb={2}>
            <p>Set Schedule</p>
          </Header>
          <FormContainer onSubmit={handleSubmit}>
            <InputField
              label="Date with"
              prepend={selectedMatch ? null : <MdPerson size={28} />}
              error={errors.match}
            >
              <SelectMatch>
                {selectedMatch ? (
                  <SelectedMatch>
                    <MatchPhoto img={selectedMatch?.photos[0]?.image_url} />
                    <p>{selectedMatch?.name}</p>
                  </SelectedMatch>
                ) : (
                  <SelectRecipientPlaceholder>
                    Select Match
                  </SelectRecipientPlaceholder>
                )}
                <SelectMatchBtn type="button" onClick={openModal}>
                  Select
                </SelectMatchBtn>
              </SelectMatch>
            </InputField>
            <InputField
              label="Pick date"
              placeholder="example@mail.com"
              type="date"
              name="date"
              value={meetUpSchedule.date}
              error={errors.date}
              prepend={<MdDateRange size={28} />}
              onChange={(e) =>
                setMeetupSchedule({ ...meetUpSchedule, date: e.target.value })
              }
            />
            <TimePicker>
              <Select
                options={hours.map((hour) => ({ text: hour, value: hour }))}
                label="Pick Hour"
                name="hour"
                placeholder="Select hours..."
                value={meetUpSchedule.time.hour}
                error={errors.hour}
                prepend="24h"
                onChange={(e) =>
                  setMeetupSchedule({
                    ...meetUpSchedule,
                    time: { ...meetUpSchedule.time, hour: e.target.value },
                  })
                }
              />
              <Select
                options={minutes.map((minute) => ({
                  text: minute,
                  value: minute,
                }))}
                label="Pick minute"
                name="minute"
                placeholder="Select minutes..."
                value={meetUpSchedule.time.minute}
                error={errors.minute}
                prepend={<FaClock size={28} />}
                onChange={(e) =>
                  setMeetupSchedule({
                    ...meetUpSchedule,
                    time: { ...meetUpSchedule.time, minute: e.target.value },
                  })
                }
              />
            </TimePicker>
            <ScheduleMeetupBtn block onClick={() => {}}>
              <FaCalendarDay />
              <p>MEET UP</p>
            </ScheduleMeetupBtn>
          </FormContainer>
        </FormSection>
        <VenueSection>
          <Header mb={2}>
            <p>Select Venues</p>
          </Header>
        </VenueSection>
      </PageContent>
      <SelectRecipientModal
        show={showModal}
        closeModal={closeModal}
        matches={matches?.data}
        selectedRecipient={selectedMatch}
        onSelectRecipient={onSelectMatch}
      />
    </>
  );
};

export default ScheduleMeetUp;
