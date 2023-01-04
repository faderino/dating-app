import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import useModal from '../../../hooks/modal';
import { VenueDiscountVoucher } from '../../../services/meetup.service';
import { useGetVenueVouchersQuery } from '../../../services/venue.service';
import {
  ActionButtons,
  EditButton,
  PageContent,
  TableWrapper,
} from '../AdminPanel';
import Table from '../components/Table';
import { TableRow, TableRowData } from '../components/Table/style';
import EditVenueVoucherModal from './EditVenueVoucherModal';

const StyledActionButtons = styled(ActionButtons)`
  justify-content: center;
`;

const VenueVouchersPage: React.FC = () => {
  const { venueId } = useParams();
  const { data: venueVouchers } = useGetVenueVouchersQuery(+venueId!);
  const {
    closeModal: closeEditModal,
    openModal: openEditModal,
    showModal: showEditModal,
  } = useModal();
  const [selectedVoucher, setSelectedVoucher] =
    useState<VenueDiscountVoucher>();

  const handleClickEdit = (voucher: VenueDiscountVoucher) => {
    setSelectedVoucher(voucher);
    openEditModal();
  };

  return (
    <>
      <PageContent>
        <TableWrapper>
          <Table headers={['No', 'Discount', 'Quota', 'Action']}>
            {venueVouchers?.map((voucher, i) => (
              <TableRow key={voucher.venue_voucher_id}>
                <TableRowData>{i + 1}.</TableRowData>
                <TableRowData>{voucher.discount_amount * 100}%</TableRowData>
                <TableRowData>{voucher.quota}</TableRowData>
                <TableRowData>
                  <StyledActionButtons>
                    <EditButton onClick={() => handleClickEdit(voucher)}>
                      EDIT
                    </EditButton>
                  </StyledActionButtons>
                </TableRowData>
              </TableRow>
            ))}
          </Table>
        </TableWrapper>
      </PageContent>
      <EditVenueVoucherModal
        show={showEditModal}
        closeModal={closeEditModal}
        voucher={selectedVoucher}
      />
    </>
  );
};

export default VenueVouchersPage;
