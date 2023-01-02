import React from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { Content } from '../../components/Layout';
import MeetUpItem from '../../components/MeetUpItem';
import {
  useAcceptInvititationMutation,
  useGetMeetUpInvitationsQuery,
  useGetSchedulesQuery,
} from '../../services/meetup.service';
import colors from '../../styles/colors';

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

const MeetUp: React.FC = () => {
  const { data: needApprovalSchedules } = useGetMeetUpInvitationsQuery();
  const { data: meetUpSchedules } = useGetSchedulesQuery('is=approved');
  const [acceptInvitation] = useAcceptInvititationMutation();

  const handleAccept = async (scheduleId: number) => {
    try {
      const resp = await acceptInvitation(scheduleId).unwrap();
      toast('✅' + resp.message);
    } catch (error: any) {
      toast.error(error.data.message, { theme: 'colored' });
    }
  };

  return (
    <PageContent>
      {needApprovalSchedules && needApprovalSchedules.count > 0 ? (
        <NeedApprovalSection>
          <Header>
            <p>Invitation</p>
          </Header>
          <ScheduleListContainer>
            {needApprovalSchedules?.data.map((schedule) => (
              <MeetUpItem
                key={schedule.schedule_id}
                schedule={schedule}
                type="invitation"
                onAccept={() => handleAccept(schedule.schedule_id)}
              />
            ))}
          </ScheduleListContainer>
        </NeedApprovalSection>
      ) : null}
      <ApprovedSchedulesSection>
        <Header>
          <p>Meet Up Schedules</p>
        </Header>
        <ScheduleListContainer>
          {meetUpSchedules?.data.map((schedule) => (
            <MeetUpItem key={schedule.schedule_id} schedule={schedule} />
          ))}
        </ScheduleListContainer>
      </ApprovedSchedulesSection>
    </PageContent>
  );
};

export default MeetUp;
