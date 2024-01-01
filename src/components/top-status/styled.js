import styled from "styled-components/macro";

export const TopStatusWrapperError = styled.div`
  position: fixed;
  z-index: 20;
  color: white;
  top: 0;
  width: 100%;
  p {
    padding-left: 20px;
  }
  svg {
    padding-right: 20px;
    path {
      stroke: white;
    }
  }
  border: 1px solid #e0e0e0;
  background-color: red;
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* padding: 0 30px; */
  height: 50px;
`;
export const TopStatusWrapperSuccess = styled.div`
  position: fixed;
  z-index: 20;
  color: white;
  top: 0;
  width: 100%;
  border: 1px solid #e0e0e0;
  background-color: #1cbb90;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  height: 50px;
`;
