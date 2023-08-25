import styled from "styled-components/macro";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 100px;
  background-color: white;
  z-index: 25;
  border-radius: 10px;
  border: 5px solid #174abc;
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
