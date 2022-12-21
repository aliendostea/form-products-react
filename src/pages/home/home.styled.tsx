import styled from "styled-components";

export const HomeStyled = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  font-size: 3rem;
`;

export const AddNewProduct = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  justify-items: end;
  margin-bottom: 8px;
`;

export const AddNewProductBtn = styled.button`
  height: 5rem;
  width: 16rem;
  display: grid;
  grid-template-columns: 3rem 1fr;
  justify-items: center;
  align-content: center;
  padding: 0 14px;
  background-color: #f6f6f6;
  border-radius: 11px;
  transition: 0.3s ease-in-out;

  & > svg {
    width: 46px;
    height: 27px;
    fill: var(--color-primary);
    align-self: center;
  }

  & span {
    font-size: 1.5rem;
    font-weight: 568;
    color: var(--color-primary);
  }

  &:hover {
    transform: translateY(-3px);
  }
`;
