import styled, { keyframes } from "styled-components";
import { TableParentStyled } from "./TableStyled.styled";

const animationStart = keyframes`
   100% {
      transform: translateX(100%);
    }
`;

export const TableProductsOnLoadStyled = styled(TableParentStyled)`
  gap: 2rem;
  padding: 3.5rem 2rem;
  margin-bottom: 2rem;
`;

export const SkeletonLoaderTitleTable = styled.div`
  display: grid;
  grid-template-columns: minmax(15rem, 28rem);

  & > span {
    height: 2.5rem;
  }
`;

export const SkeletonLoaderBox = styled.div`
  display: grid;
  grid-template-columns: 3rem 10rem 1fr;
  align-items: center;
`;

const SkeletonLoader = styled.span`
  width: 100%;
  height: 1.5rem;
  display: inline-block;
  position: relative;
  overflow: hidden;
  background-color: #e6e6e6;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    transform: translateX(-100%);
    background: linear-gradient(
      86deg,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.35) 52%,
      rgba(255, 255, 255, 0) 90%
    );
    animation: ${animationStart} 2s infinite;
  }
`;

const SkeletonImgLoader = styled.span`
  width: 8rem;
  height: 8rem;
  display: inline-block;
  border-radius: 5px;
  position: relative;
  overflow: hidden;
  background-color: #e6e6e6;
  transform: translateX(7px);

  &::after {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    transform: translateX(-100%);
    background: linear-gradient(
      86deg,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.35) 52%,
      rgba(255, 255, 255, 0) 90%
    );
    animation: ${animationStart} 2s infinite;
  }
`;

const TableProductsOnLoad = () => {
  return (
    <TableProductsOnLoadStyled>
      <SkeletonLoaderTitleTable>
        <SkeletonLoader />
      </SkeletonLoaderTitleTable>

      {Array.from({ length: 5 }, (v, i) => (
        <SkeletonLoaderBox key={`SkeletonLoaderBox-table${i}`}>
          <SkeletonLoader />
          <SkeletonImgLoader />
          <SkeletonLoader />
        </SkeletonLoaderBox>
      ))}
    </TableProductsOnLoadStyled>
  );
};

export default TableProductsOnLoad;
