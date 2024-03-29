import React, { useEffect, useState } from 'react';
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
import {
  RescheduleMeetUpRequest,
  ScheduleMeetUpRequest,
  useLazyGetVenueListQuery,
  useRescheduleMeetUpMutation,
  useSetMeetUpScheduleMutation,
  Venue,
} from '../../services/meetup.service';
import VenueCard from '../../components/VenueCard';
import { selectProfile } from '../../store/profile/profileSlice';
import { useAppSelector } from '../../hooks/store';
import { toast } from 'react-toastify';
import Spinner from '../../components/Spinner/Spinner';
import Pagination from '../../components/Pagination';

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

const VenueSection = styled(Section)`
  padding-bottom: 5rem;
`;

const FormSection = styled(Section)``;

const FormContainer = styled.form`
  max-width: 500px;
  margin: 0 auto;
  width: 90%;
`;

const TimePicker = styled.div`
  display: flex;
  align-items: baseline;
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

const VenueListContainer = styled.div`
  margin: 0 auto;
  width: 90%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem 2rem;
`;

const PaginationContainer = styled.div`
  margin: 0 auto;
  width: 90%;
  margin-bottom: 1rem;
`;

const hours = [...Array(24)].map((_, n) => n.toString().padStart(2, '0'));
const minutes = [...Array(60)].map((_, n) => n.toString().padStart(2, '0'));

const ScheduleMeetUp: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const profile = useAppSelector(selectProfile);
  const [page, setPage] = useState(1);
  const [matchesPage, setMatchesPage] = useState(1);
  const { data: matches } = useGetMatchesQuery(matchesPage);
  const [getVenueList, { data: venues }] = useLazyGetVenueListQuery();
  const [setMeetUpScheduleMutation, { isLoading }] =
    useSetMeetUpScheduleMutation();
  const [rescheduleMeetUp, { isLoading: rescheduleLoading }] =
    useRescheduleMeetUpMutation();
  const [selectedVenue, setSelectedVenue] = useState<Venue>(
    location.state?.schedule?.venue,
  );
  const [selectedMatch, setSelectedMatch] = useState<Profile>(
    location.state?.match,
  );
  const { closeModal, openModal, showModal } = useModal();
  const currentDate = new Date(Date.now());
  const [meetUpSchedule, setMeetupSchedule] = useState({
    date:
      location.state?.schedule?.date_time.substring(0, 10) ||
      `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1)
        .toString()
        .padStart(2, '0')}-${currentDate
        .getDate()
        .toString()
        .padStart(2, '0')}`,
    time: {
      hour:
        location.state?.schedule?.date_time.substring(11, 13) ||
        currentDate.getHours().toString(),
      minute:
        location.state?.schedule?.date_time.substring(14, 16) ||
        currentDate.getMinutes().toString(),
    },
  });
  const [errors, setErrors] = useState({
    match: '',
    date: '',
    hour: '',
    minute: '',
    venue: '',
  });

  useEffect(() => {
    if (matches) {
      const matchId = matches.data.find(
        (match) => match.liked_user_id === selectedMatch?.profile_id,
      )?.like_id;
      const req = { matchId: matchId!, page: page };
      getVenueList(req);
    }
  }, [selectedMatch, matches, page]);

  useEffect(() => {
    if (errors.venue) {
      toast.error(errors.venue, { theme: 'colored' });
    }
  }, [errors.venue]);

  const changePage = (p: number) => {
    setPage(p);
  };

  const changeMatchPage = (p: number) => {
    setMatchesPage(p);
  };

  const onSelectMatch = (match: Profile) => {
    setSelectedMatch(match);
  };

  const validateForm = (): boolean => {
    setErrors({ match: '', date: '', hour: '', minute: '', venue: '' });
    const currentError = {} as typeof errors;
    if (!selectedVenue) {
      currentError.venue = 'Select venue';
    }
    if (!selectedMatch) {
      currentError.match = 'Select partner';
    }
    const schedule = moment(
      `${meetUpSchedule.date}T${meetUpSchedule.time.hour}:${meetUpSchedule.time.minute}:00Z`,
      'YYYY-MM-DD HH:mm',
    ).format();
    if (moment().diff(schedule, 'm') >= 0) {
      currentError.minute = 'Incorrect time';
    }
    if (moment().diff(schedule, 'h') > 0) {
      currentError.minute = 'Incorrect time';
      currentError.hour = 'Incorrect time';
    }
    if (moment().diff(schedule, 'd') > 0) {
      currentError.minute = 'Incorrect time';
      currentError.hour = 'Incorrect time';
      currentError.date = 'Incorrect time';
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

    const schedule = moment(
      `${meetUpSchedule.date}T${meetUpSchedule.time.hour}:${meetUpSchedule.time.minute}:00Z`,
      'YYYY-MM-DD HH:mm',
    ).format();
    const scheduleMeetUpRequest: ScheduleMeetUpRequest = {
      date_time: schedule,
      second_party_user_id: selectedMatch.profile_id,
      venue_id: selectedVenue!.venue_id,
    };

    try {
      if (location.state?.schedule) {
        const rescheduleMeetUpRequest: RescheduleMeetUpRequest = {
          scheduleId: location.state.schedule.schedule_id as number,
          date_time: schedule,
          venue_id: selectedVenue!.venue_id,
        };
        const resp = await rescheduleMeetUp(rescheduleMeetUpRequest).unwrap();
        toast('✅ ' + resp.message);
        navigate('/app/meet-up');
        return;
      }
      const resp = await setMeetUpScheduleMutation(
        scheduleMeetUpRequest,
      ).unwrap();
      toast('✅ ' + resp.message);
      navigate('/app/matches');
    } catch (error: any) {
      toast.error(error.data.message, { theme: 'colored' });
    }
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
                  <SelectedMatchPlaceholder>
                    Select Match
                  </SelectedMatchPlaceholder>
                )}
                {location.state?.schedule ? null : (
                  <SelectMatchBtn type="button" onClick={openModal}>
                    Select
                  </SelectMatchBtn>
                )}
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
            <ScheduleMeetupBtn block>
              {isLoading || rescheduleLoading ? (
                <Spinner />
              ) : (
                <>
                  <FaCalendarDay />
                  <p>{location.state?.schedule ? 'RE-SCHEDULE' : 'MEET UP'}</p>
                </>
              )}
            </ScheduleMeetupBtn>
          </FormContainer>
        </FormSection>
        <VenueSection>
          <Header mb={2}>
            <p>Select Venues</p>
          </Header>
          <PaginationContainer>
            {venues ? (
              <Pagination
                pageData={{
                  page: venues.page,
                  size: venues.size,
                  count: venues.count,
                  total_pages: venues.total_pages,
                }}
                changePage={changePage}
              />
            ) : null}
          </PaginationContainer>
          <VenueListContainer>
            {venues?.data.map((venue) => (
              <VenueCard
                key={venue.venue_id}
                venue={venue}
                onClick={() => setSelectedVenue(venue)}
                recommended={
                  venue.city_id === selectedMatch.location?.city_id ||
                  venue.city_id === profile?.location.city_id
                }
                active={selectedVenue?.venue_id === venue.venue_id}
              />
            ))}
          </VenueListContainer>
        </VenueSection>
      </PageContent>
      {matches ? (
        <SelectRecipientModal
          show={showModal}
          closeModal={closeModal}
          matches={matches?.data}
          selectedRecipient={selectedMatch}
          onSelectRecipient={onSelectMatch}
          changePage={changeMatchPage}
          pageData={{
            page: matches.page,
            count: matches.count,
            size: matches.size,
            total_pages: matches.total_pages,
          }}
        />
      ) : null}
    </>
  );
};

export default ScheduleMeetUp;
