import styled from "styled-components/macro";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 60px;
  background-color: white;
  z-index: 25;
  border-radius: 10px;
  border: 2px solid #174abc;
`;

export const MainWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 15;
  display: flex;
  justify-content: center;
  align-items: center;
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
