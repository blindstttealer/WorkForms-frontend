import styled from 'styled-components';
import React from 'react';
const Wrapper = styled.div`
  position: relative;
  width: 32px;
  height: 32px;
`;
const StyledIcon = styled.svg`
  width: 100%;
  height: 100%;
  stroke: #333;
`;
const Badge = styled.div`
  position: absolute;
  top: -6px;
  right: -6px;
  background-color: #e63946;
  color: white;
  font-size: 0.7rem;
  font-weight: bold;
  border-radius: 50%;
  padding: 2px 6px;
  min-width: 20px;
  text-align: center;
  line-height: 1;
`;
type Props = {
  count?: number;
};
export const CartIcon: React.FC<Props> = ({ count = 3 }) => {
  return (
    <Wrapper>
      <StyledIcon
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M6 2L2 7h4l2 11h8L18 7h4L12 2z" />
        <path d="M2 7h20" />
        <circle cx="9" cy="21" r="2" />
        <circle cx="17" cy="21" r="2" />
      </StyledIcon>
      <Badge>{count}</Badge>
    </Wrapper>
  );
};
