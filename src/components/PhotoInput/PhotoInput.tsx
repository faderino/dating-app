import React, { useId } from 'react';
import { MdAddCircle } from 'react-icons/md';
import { FaTimesCircle } from 'react-icons/fa';
import styled, { css } from 'styled-components';
import colors from '../../styles/colors';

const Container = styled.div`
  text-align: left;
  display: inline-block;
  position: relative;
`;

const Label = styled.label`
  display: block;
  position: absolute;
  bottom: -0.75rem;
  right: -0.5rem;
  cursor: pointer;
`;

const DeletePhotoBtn = styled.div`
  display: flex;
  position: absolute;
  bottom: -0.4rem;
  right: -0.4rem;
  border-radius: 50%;
  background-color: ${colors.primary};
  cursor: pointer;
`;

const StyledInput = styled.div<Pick<PhotoInputProps, 'error' | 'preview'>>`
  ${(props) => css`
    aspect-ratio: 2/3;
    border: ${props.preview
      ? 'none'
      : `2px dashed ${props.error ? colors.red50 : colors.gray20}`};
    color: ${props.error ? colors.red50 : colors.gray30};
    border-radius: 0.6rem;
    overflow: hidden;
    background-color: ${props.preview ? 'transparent' : colors.gray10};
    transition: all 0.3s ease;
    :focus-within {
      border-color: ${colors.gray50};
    }
    ${props.preview &&
    css`
      background-image: url(${props.preview});
      background-position: 50% 50%;
      background-repeat: no-repeat;
      background-size: cover;
    `}
  `}
`;

const FileInput = styled.input`
  border: none;
  background-color: inherit;
  font-size: 1rem;
  line-height: 3.25;
  width: 100%;
  height: 100%;
  color: transparent;
  :focus {
    outline: none;
  }
  ::-webkit-file-upload-button {
    visibility: hidden;
    display: none;
  }
`;

const ErrorText = styled.p`
  color: ${colors.red50};
  font-style: italic;
  font-size: 0.9rem;
`;

type PhotoInputProps = {
  preview?: string;
  value?: any;
  name?: string;
  error?: string;
  prepend?: React.ReactNode;
  append?: React.ReactNode;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  className?: string;
  deleteFile?: () => void;
};

const PhotoInput: React.FC<PhotoInputProps> = ({
  prepend,
  append,
  error,
  preview,
  className,
  deleteFile,
  ...props
}) => {
  const inputId = useId();

  const handleDelete = () => {
    const inputFile = document.getElementById(inputId) as HTMLInputElement;
    inputFile.value = '';
    deleteFile?.();
  };

  return (
    <Container className={className}>
      {preview ? (
        <DeletePhotoBtn onClick={handleDelete}>
          <FaTimesCircle color={colors.white} size={24} />
        </DeletePhotoBtn>
      ) : (
        <Label htmlFor={inputId}>
          <MdAddCircle color={colors.primary} size={28} />
        </Label>
      )}
      <StyledInput error={error} preview={preview}>
        {prepend}
        <FileInput
          id={inputId}
          type="file"
          title=""
          accept="image/*"
          disabled={Boolean(preview)}
          {...props}
        />
        {append}
      </StyledInput>
      {error && <ErrorText>{error}</ErrorText>}
    </Container>
  );
};

export default PhotoInput;
