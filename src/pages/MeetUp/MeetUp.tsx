import moment from 'moment';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { Content } from '../../components/Layout';
import MeetUpItem from '../../components/MeetUpItem';
import Pagination from '../../components/Pagination';
import useModal from '../../hooks/modal';
import {
  Schedule,
  useAcceptInvititationMutation,
  useGetMeetUpInvitationsQuery,
  useGetSchedulesQuery,
} from '../../services/meetup.service';
import colors from '../../styles/colors';
import ClaimDiscountModal from './ClaimDiscountModal';

const PageContent = styled(Content)``;

const Container = styled.div`
  width: 95%;
  max-width: 1024px;
  margin: auto;
`;

const NeedApprovalSection = styled.div``;

const ApprovedSchedulesSection = styled.div``;

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

const ScheduleListContainer = styled(Container)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
  padding-bottom: 2rem;
`;

const PaginationContainer = styled.div`
  width: 95%;
  max-width: 1024px;
  margin: 0 auto 1rem auto;
`;

const MeetUp: React.FC = () => {
  const navigate = useNavigate();
  const [invitationPage, setInvitationPage] = useState(1);
  const [meetupPage, setMeetupPage] = useState(1);
  const { data: needApprovalSchedules } =
    useGetMeetUpInvitationsQuery(invitationPage);
  const { data: meetUpSchedules } = useGetSchedulesQuery(
    `is=approved&page=${meetupPage}`,
  );
  const [acceptInvitation] = useAcceptInvititationMutation();

  const { closeModal, openModal, showModal } = useModal();
  const [selectedSchedule, setSelectedSchedule] = useState<Schedule>();

  const handleAccept = async (scheduleId: number) => {
    try {
      const resp = await acceptInvitation(scheduleId).unwrap();
      toast('✅' + resp.message);
    } catch (error: any) {
      toast.error(error.data.message, { theme: 'colored' });
    }
  };

  const handleReschedule = (schedule: Schedule) => {
    navigate('/app/meet-up/re-schedule', {
      state: { match: schedule.first_party_user, schedule },
    });
  };

  const onClaimDiscount = (schedule: Schedule) => {
    setSelectedSchedule(schedule);
    openModal();
  };

  const changeInvitationPage = (p: number) => {
    setInvitationPage(p);
  };

  const changeMeetupPage = (p: number) => {
    setMeetupPage(p);
  };

  return (
    <>
      <PageContent>
        {needApprovalSchedules && needApprovalSchedules.count > 0 ? (
          <NeedApprovalSection>
            <Header>
              <p>Invitation</p>
            </Header>
            <PaginationContainer>
              {needApprovalSchedules ? (
                <Pagination
                  pageData={{
                    page: needApprovalSchedules.page,
                    count: needApprovalSchedules.count,
                    size: needApprovalSchedules.size,
                    total_pages: needApprovalSchedules.total_pages,
                  }}
                  changePage={changeInvitationPage}
                />
              ) : null}
            </PaginationContainer>
            <ScheduleListContainer>
              {needApprovalSchedules?.data.map((schedule) => {
                return (
                  <MeetUpItem
                    key={schedule.schedule_id}
                    schedule={schedule}
                    type="invitation"
                    onAccept={() => handleAccept(schedule.schedule_id)}
                    onReschedule={() => handleReschedule(schedule)}
                  />
                );
              })}
            </ScheduleListContainer>
          </NeedApprovalSection>
        ) : null}
        <ApprovedSchedulesSection>
          <Header>
            <p>Meet Up Schedules</p>
          </Header>
          <PaginationContainer>
            {meetUpSchedules ? (
              <Pagination
                pageData={{
                  page: meetUpSchedules.page,
                  count: meetUpSchedules.count,
                  size: meetUpSchedules.size,
                  total_pages: meetUpSchedules.total_pages,
                }}
                changePage={changeMeetupPage}
              />
            ) : null}
          </PaginationContainer>
          <ScheduleListContainer>
            {meetUpSchedules?.data.map((schedule) => {
              const dateTime = moment(
                schedule.date_time,
                'YYYY-MM-DD HH:mm:ss',
              ).format();
              const isExpired = moment().diff(dateTime, 'm') >= 0;
              const isClaimed = schedule.claimed_voucher_id !== null;
              const haveDiscounts = schedule.venue!.venue_vouchers.length > 0;
              return (
                <MeetUpItem
                  key={schedule.schedule_id}
                  schedule={schedule}
                  type={
                    isExpired || isClaimed || !haveDiscounts
                      ? 'schedule'
                      : 'voucher'
                  }
                  onClaimDiscount={() => onClaimDiscount(schedule)}
                />
              );
            })}
          </ScheduleListContainer>
        </ApprovedSchedulesSection>
      </PageContent>
      <ClaimDiscountModal
        show={showModal}
        closeModal={closeModal}
        schedule={selectedSchedule}
      />
    </>
  );
};

export default MeetUp;
