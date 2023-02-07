import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import styled, { keyframes } from "styled-components";

const animationStart = keyframes`
   100% {
      transform: translateX(100%);
    }
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
  border-radius: 50%;
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

interface SkeletonTableBodyProps {
  id: string;
}

const SkeletonTableBody = ({ id }: SkeletonTableBodyProps) => {
  return (
    <TableBody key={`skeletonLoaderTable-${id}`}>
      <TableRow role="checkbox" tabIndex={-1} key={"009909"}>
        <TableCell>
          <SkeletonLoader />
        </TableCell>
        <TableCell component="th" id="9998" scope="row" padding="none">
          <SkeletonLoader />
        </TableCell>
        {Array.from({ length: 5 }, (v, i) => (
          <TableCell key={`skeletonTableCell-${i}-${id}`} align="left">
            <SkeletonLoader />
          </TableCell>
        ))}

        <TableCell align="left">
          <SkeletonImgLoader />
        </TableCell>
        <TableCell align="left">
          <SkeletonLoader />
        </TableCell>
      </TableRow>
    </TableBody>
  );
};

export default SkeletonTableBody;
