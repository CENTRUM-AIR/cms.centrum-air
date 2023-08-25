import styled, { keyframes } from "styled-components/macro";

const SidePopUp = keyframes`
  from {
    width: 0;
  }
  to {
    width: 630px;
  }
`;

export const MainWrapper = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  z-index: 15;
  height: 100%;
  overflow-y: scroll;
  background-color: #fff;
`;
export const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.2);
  z-index: ${({ zIndex }) => zIndex || 10};
  touch-action: none;
  -ms-touch-action: none;
`;

export const Wrapper = styled.div`
  background-color: #fff;
  z-index: 11;
  animation: ${SidePopUp} 0.2s ease-in-out;
  width: 630px;
  padding: 35px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const Progression = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

export const CloseText = styled.button`
  outline: none;
  border: none;
  background-color: transparent;
  cursor: pointer;
  font-size: 16 px;
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

export const MainTitle = styled.h1`
  font-size: 32px;
  font-style: normal;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0;
`;

export const ButtonHolder = styled.div`
  display: flex;
  /* gap: 15px; */
  justify-content: space-between;
`;

export const WarningText = styled.p`
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  color: #727d97;
`;
