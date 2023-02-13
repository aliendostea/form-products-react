import { baseImageFormSize } from "@/pages/home/home.styled";
import styled from "styled-components";

interface InputFilesProps {
  id: string;
  name: string;
  label?: string;
  placeholder: string;
  value: string;
  error: string | undefined;
  touched: boolean | undefined;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement, Element>) => void;
}

export const InputFilesStyled = styled.input`
  grid-column: 1 / -1;
  grid-row: 1 / -1;
  width: ${baseImageFormSize};
  height: ${baseImageFormSize};
  display: inline-block;
  border-radius: 6px;
  opacity: 0;
  cursor: pointer;
  z-index: 10;

  &:hover + figure {
    outline: none;
    border: 2px solid var(--color-primary);
    box-shadow: 0 12px 20px #cecece;
    transform: translateY(-4px);
  }
`;

const InputFiles = ({ id, name, ...props }: InputFilesProps) => {
  return (
    <InputFilesStyled id={id} name={name} type="file" multiple {...props} />
  );
};

export default InputFiles;
