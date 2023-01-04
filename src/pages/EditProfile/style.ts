import styled from 'styled-components';
import { PrimaryButton } from '../../components/Button';
import { Content } from '../../components/Layout';
import colors from '../../styles/colors';
import { SelectMatchBtn } from '../BuyGift/style';

export const PageContent = styled(Content)`
  @media screen and (min-width: 896px) {
    height: 100vh;
    display: flex;
    width: 100%;
  }
`;

export const PhotoSection = styled.div`
  margin-bottom: 2rem;
  @media screen and (min-width: 896px) {
    flex-basis: 50%;
  }
`;

export const EditDataSection = styled.div`
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

export const PhotoInputContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  margin: 0 auto;
  width: 90%;
  max-width: 650px;
  gap: 0.75rem;
  & > div {
    flex: 0 1 30%;
  }
`;

export const FormContainer = styled.div`
  width: 95%;
  max-width: 1024px;
  margin: auto;
  form {
    padding-bottom: 5rem;
  }
`;

export const SelectHobbies = styled.div`
  width: 100%;
  padding: 0.5rem 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const CurrentHobbies = styled.div`
  padding: 0.5rem;
  color: ${colors.text};
`;

export const SelectHobbiesBtn = styled(SelectMatchBtn)``;

export const SaveButton = styled(PrimaryButton)`
  padding: 1rem;
  margin-top: 1rem;
`;

export const ToastImageUpload = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  img {
    width: 40px;
    height: 40px;
    object-fit: cover;
    object-position: 50% 50%;
  }
`;

export const PhotoInputOverlay = styled.div`
  position: relative;
`;

export const AddCaptionButton = styled.div`
  cursor: pointer;
  position: absolute;
  top: -0.5rem;
  right: -0.5rem;
  background-color: ${colors.white};
  display: flex;
  padding: 0.05rem 0.2rem;
  border-radius: 0.25rem;
`;
