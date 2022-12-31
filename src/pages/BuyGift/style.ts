import styled from 'styled-components';
import { PrimaryButton } from '../../components/Button';
import { Content } from '../../components/Layout';
import colors from '../../styles/colors';

export const PageContent = styled(Content)`
  @media screen and (min-width: 896px) {
    height: 100vh;
    display: flex;
    width: 100%;
  }
`;

export const Preview = styled.div`
  @media screen and (min-width: 896px) {
    flex-basis: 50%;
  }
`;

export const Form = styled.div`
  @media screen and (min-width: 896px) {
    flex-basis: 50%;
    form {
      max-width: 500px;
      margin: 0 auto;
    }
  }
`;

export const Header = styled.div<{ mb?: number }>`
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

export const Container = styled.div`
  width: 95%;
  max-width: 1024px;
  margin: auto;
`;

export const PreviewSection = styled.div`
  background-color: ${colors.gray10};
  padding: 1rem;
  margin-bottom: 2rem;
  @media screen and (min-width: 896px) {
    height: calc(100% - 54px);
    padding-top: 15rem;
  }
`;

export const AddToBagButton = styled(PrimaryButton)`
  padding: 1rem;
  margin-bottom: 2rem;
`;

export const SelectRecipient = styled.div`
  width: 100%;
  padding: 0.5rem 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const SelectedRecipient = styled.div`
  flex-basis: 60%;
  display: flex;
  align-items: center;
  color: ${colors.text};
  gap: 0.7rem;
  p {
    font-size: 1.1rem;
  }
`;

export const SelectRecipientPlaceholder = styled.p`
  padding: 0.6rem 0;
`;

export const RecipientPhoto = styled.div<{ img?: string }>`
  width: 2.5rem;
  aspect-ratio: 1;
  background-image: url(${(props) => props.img});
  background-position: 50% 50%;
  background-size: cover;
  background-repeat: no-repeat;
  background-color: ${colors.black};
  border-radius: 50%;
`;

export const SelectMatchBtn = styled.button`
  border: none;
  font-size: 0.8rem;
  text-transform: uppercase;
  font-weight: 600;
  cursor: pointer;
  background-color: ${colors.gray20};
  color: ${colors.gray60};
  padding: 0.25rem;
  border-radius: 0.25rem;
  :hover {
    background-color: ${colors.gray30};
  }
`;
