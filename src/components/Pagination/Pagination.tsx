import React from 'react';

import styled, { css } from 'styled-components';
import colors from '../../styles/colors';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

export const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const PaginationButton = styled.button<{ active?: boolean }>`
  border: none;
  font-size: 1rem;
  line-height: 1.5;
  font-weight: 700;
  color: ${colors.text};
  cursor: pointer;
  :hover {
    background-color: ${colors.gray10};
    color: ${colors.text};
  }
  ${({ active }) =>
    active &&
    css`
      background-color: ${colors.gray10};
      color: ${colors.text};
    `}
`;

const PrevNextPageButton = styled(PaginationButton)<{ disabled?: boolean }>`
  ${({ disabled }) =>
    disabled &&
    css`
      &,
      :hover {
        background-color: ${colors.gray30};
        color: ${colors.gray10};
        cursor: default;
      }
    `}
`;

export const PrevButton = styled(PrevNextPageButton)`
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
`;

export const NextButton = styled(PrevNextPageButton)`
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
`;

export const JumpPageButton = styled(PaginationButton)`
  font-size: 0.8rem;
  border-radius: 2px;
`;

export const Arrow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export interface PageData {
  page: number;
  size: number;
  count: number;
  total_pages: number;
}

type Props = {
  pageData: PageData;
  changePage: (page: number) => void;
};

const Pagination: React.FC<Props> = ({ pageData, changePage }) => {
  return (
    <Container>
      <PrevButton
        disabled={pageData.page === 1}
        onClick={() => changePage(pageData.page - 1)}
      >
        <Arrow>
          <MdChevronLeft />
        </Arrow>
      </PrevButton>
      {[...Array(pageData.total_pages)].map((_, pageIndex) => (
        <JumpPageButton
          active={pageData.page === pageIndex + 1}
          key={pageIndex}
          onClick={() => changePage(pageIndex + 1)}
        >
          {pageIndex + 1}
        </JumpPageButton>
      ))}
      <NextButton
        disabled={pageData.page === pageData.total_pages}
        onClick={() => changePage(pageData.page + 1)}
      >
        <Arrow>
          <MdChevronRight />
        </Arrow>
      </NextButton>
    </Container>
  );
};

export default Pagination;
