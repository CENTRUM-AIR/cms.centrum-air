import styled from "styled-components/macro";

export const MainWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 90vh;
  justify-content: center;
  align-items: center;
`;

export const InsideWrapper = styled.div`
  display: flex;
  max-width: 500px;
  width: 100%;
  justify-content: center;
  flex-direction: column;
  text-align: center;
`;

export const NotFoundText = styled.h1`
  font-size: 50px;
  font-weight: 700;
  color: #174c6e;
`;

export const NotFoundSubtitle = styled.h2`
  font-size: 30px;
  font-weight: 700;
  color: #174c6e;
`;
