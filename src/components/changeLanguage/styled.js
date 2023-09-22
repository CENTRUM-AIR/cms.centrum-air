import styled from "styled-components/macro";

export const Progression = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  button {
    max-height: 40px;
  }
`;

export const CloseText = styled.button`
  outline: none;
  border: none;
  background-color: transparent;
  cursor: pointer;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  color: ${({ done }) => (done ? "#000" : "#727D97")};
  display: flex;
  align-items: center;
  gap: 5px;
`;

export const ProgressionDash = styled.div`
  width: 100%;
  height: 2px;
  background-color: #727d97;
  opacity: 0.2;
`;
