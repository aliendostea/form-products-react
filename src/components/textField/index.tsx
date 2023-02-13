import styled from "styled-components";

interface TextfieldProps {
  id: string;
  name: string;
  label: string;
  placeholder: string;
  value: number | string;
  type?: string;
  error: string | undefined;
  touched: boolean | undefined;
  onBlur: (e: React.FocusEvent<HTMLInputElement, Element>) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface InputStyledProps {
  isError: string | boolean | undefined;
}

export const InputStyled = styled.input<InputStyledProps>`
  width: 100%;
  display: inline-block;
  font-family: "Cairo", sans-serif;
  font-size: 1.6rem;
  font-weight: 300;
  color: #1c1f2e;
  letter-spacing: 0.31px;
  background-color: #fff;
  border: 2px solid #e0e0e0;
  border-radius: 4.5px;
  outline: none;
  overflow-x: hidden;
  padding: 0 1.8rem 0 1.2rem;
  resize: none;
  transition: all 0.3s ease-in-out;

  ${({ isError }) =>
    isError
      ? "border: 2px solid var(--color-red);"
      : "border: 2px solid #e0e0e0;"};

  &:focus {
    outline: none;
    border: 2px solid var(--color-primary);
    box-shadow: 0 3px 20px #cecece;
  }
`;

export const BoxStyled = styled.div`
  width: 100%;
  display: grid;
  grid-template-rows: min-content 6rem 1rem;
`;

interface LabelStyledProps {
  touched?: boolean | undefined;
}

export const LabelStyled = styled.label<LabelStyledProps>`
  display: block;
  font-size: 1.35rem;
  font-weight: 600;
  margin-bottom: 0.5rem;

  &--error {
    color: #c12626;
  }
`;

export const SpanErrorStyled = styled.div`
  display: inline-block;
  font-size: 1.2rem;
  color: #c12626;
  margin-top: 2px;
`;

const Textfield = ({
  name,
  label,
  error,
  touched,
  ...props
}: TextfieldProps) => {
  return (
    <BoxStyled>
      <LabelStyled touched={touched} htmlFor={name}>
        {label}
      </LabelStyled>
      <InputStyled name={name} {...props} isError={error && touched} />

      {error && touched && <SpanErrorStyled>{error}</SpanErrorStyled>}
    </BoxStyled>
  );
};

export default Textfield;
