import React, { useCallback, useEffect, useState } from 'react';
import { MdSearch } from 'react-icons/md';
import styled from 'styled-components';
import InputField from '../../components/InputField/InputField';
import Pagination from '../../components/Pagination';
import Select from '../../components/Select';
import useModal from '../../hooks/modal';
import { useGetCitiesQuery } from '../../services/cities.service';
import { Venue } from '../../services/venue.service';
import { useGetAllVenuesQuery } from '../../services/venue.service';
import colors from '../../styles/colors';
import { debounce } from '../../utils/debounce';
import StatusChip from './components/StatusChip';
import { Chip } from './components/StatusChip/StatusChip';
import Table from './components/Table';
import { TableRow, TableRowData } from './components/Table/style';
import EditVenueModal from './EditVenueModal';

const PageContent = styled.div`
  max-width: 1024px;
  margin: 0 auto;
  width: 90%;
  padding: 2rem 0;
`;

const TableWrapper = styled.div`
  margin-bottom: 2rem;
`;

const VenueVoucherRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  justify-content: space-between;
  p {
    font-weight: 700;
  }
  @media screen and (max-width: 768px) {
    justify-content: end;
  }
`;

const ShowVouchersButton = styled(Chip)`
  cursor: pointer;
  background-color: ${colors.text};
  color: ${colors.white};
`;

const ActionButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  justify-content: end;
`;

const ActionButton = styled.button`
  border: none;
  border-radius: 0.25rem;
  padding: 0.6rem 1.2rem;
  cursor: pointer;
`;

const EditButton = styled(ActionButton)`
  background-color: ${colors.blue};
  color: ${colors.white};
  font-size: 0.85rem;
  font-weight: 700;
`;

const Toolbar = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(175px, 1fr));
  align-items: flex-end;
  padding: 1rem 0;
  gap: 1rem;
`;

const SearchContainer = styled.div`
  div {
    margin: 0;
    label {
      margin: 0.25rem;
    }
  }
`;

const FilterCityContainer = styled.div`
  div {
    margin: 0;
    label {
      margin: 0.25rem;
    }
  }
`;

const AdminPanel: React.FC = () => {
  const { data: cities } = useGetCitiesQuery();
  const [query, setQuery] = useState<{ [key: string]: any }>({});
  const [queryString, setQueryString] = useState('');
  const { data: venues } = useGetAllVenuesQuery(queryString);

  const [search, setSearch] = useState('');
  const {
    closeModal: closeEditModal,
    openModal: openEditModal,
    showModal: showEditModal,
  } = useModal();
  const [selectedVenue, setSelectedVenue] = useState<Venue>();

  useEffect(() => {
    const queryParams = new URLSearchParams(query);
    setQueryString(queryParams.toString());
  }, [query]);

  const changeSearch = useCallback(
    debounce((s: string) => setQuery({ ...query, search: s }), 500),
    [],
  );

  useEffect(() => {
    changeSearch(search);
  }, [search]);

  const changePage = (page: number) => {
    setQuery({ ...query, page });
  };

  const handleClickEdit = (venue: Venue) => {
    setSelectedVenue(venue);
    openEditModal();
  };

  return (
    <>
      <PageContent>
        <Toolbar>
          <SearchContainer>
            <InputField
              label="Search by name"
              placeholder="Search..."
              prepend={<MdSearch size={28} />}
              onChange={(e) => {
                setQuery({ ...query, page: 1 });
                setSearch(e.target.value);
              }}
            />
          </SearchContainer>
          <FilterCityContainer>
            {cities ? (
              <Select
                label="Filter city"
                placeholder="Filter City"
                options={[
                  { text: 'All', value: '' },
                  ...cities.map((city) => {
                    return {
                      value: city.city_id,
                      text: city.name,
                    };
                  }),
                ]}
                onChange={(e) =>
                  setQuery({ ...query, page: 1, city: e.target.value })
                }
              />
            ) : null}
          </FilterCityContainer>
          <FilterCityContainer>
            <Select
              label="Sort"
              placeholder="Sort venues"
              options={[
                { value: 'asc', text: 'Oldest' },
                { value: 'desc', text: 'Newest' },
              ]}
              onChange={(e) =>
                setQuery({
                  ...query,
                  page: 1,
                  sortBy: 'created_at',
                  sortDir: e.target.value,
                })
              }
            />
          </FilterCityContainer>
          <div />
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
        </Toolbar>
        <TableWrapper>
          <Table
            headers={[
              'No',
              'Venue',
              'Address',
              'City',
              'Status',
              'Vouchers',
              'Action',
            ]}
          >
            {venues?.data.map((venue, i) => (
              <TableRow key={venue.venue_id}>
                <TableRowData>{i + 1}.</TableRowData>
                <TableRowData>{venue.name}</TableRowData>
                <TableRowData>{venue.address}</TableRowData>
                <TableRowData>{venue.city.name}</TableRowData>
                <TableRowData center>
                  <StatusChip available={venue.available} />
                </TableRowData>
                <TableRowData>
                  <VenueVoucherRow>
                    {venue.venue_vouchers.length > 0 ? (
                      <p>{venue.venue_vouchers.length}x</p>
                    ) : null}
                    <ShowVouchersButton>SHOW</ShowVouchersButton>
                  </VenueVoucherRow>
                </TableRowData>
                <TableRowData>
                  <ActionButtons>
                    <EditButton onClick={() => handleClickEdit(venue)}>
                      EDIT
                    </EditButton>
                  </ActionButtons>
                </TableRowData>
              </TableRow>
            ))}
          </Table>
        </TableWrapper>
      </PageContent>
      {cities ? (
        <EditVenueModal
          show={showEditModal}
          closeModal={closeEditModal}
          venue={selectedVenue}
          cities={cities}
        />
      ) : null}
    </>
  );
};

export default AdminPanel;
