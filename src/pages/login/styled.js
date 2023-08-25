import styled from "styled-components/macro";

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  flex-direction: column;
`;

export const StyledForm = styled.form`
  display: flex;
  gap: 25px;
  flex-direction: column;
  margin-top: 30px;

  input {
    border: ${({ error }) => (error && "1px solid red")};
  }
`;

export const Holder = styled.div`
  /* width: 540px; */
  background: #ffffff;
  border-radius: 32px;
  padding: 25px 35px;
`;

export const Title = styled.h1`
  font-size: 26px;
  font-style: normal;
  font-weight: 600;
  margin-bottom: 6px !important;
`;

export const Subtitle = styled.h2`
  color: #727d97;
  margin: 0 !important;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
`;

export const StyledLabel = styled.label`
  color: #727d97;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const Global = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 98vh;
  flex-direction: column;
  padding-top: 20px;
`;
