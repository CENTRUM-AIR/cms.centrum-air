import styled from "styled-components/macro";

export const StyledInput = styled.input`
  height: 56px;
  outline: none;
  border: none;
  background-color: #f3f6fc;
  border-radius: 12px;
  padding: 0 15px;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
`;

export const StyledTextArea = styled.textarea`
  min-height: 61px;
  outline: none;
  border: none;
  background-color: #f3f6fc;
  border-radius: 12px;
  padding: 15px 15px 0;
  font-size: 16px;
  font-style: normal;
  font-family: "Inter", sans-serif;
  font-weight: 400;
  /* dont let to resize horizontally */
  resize: vertical;
`;

export const StyledButton = styled.button`
  border: none;
  outline: none;
  border-radius: 12px;
  background-color: #174abc;
  opacity: ${({ disabled }) => (disabled ? "0.5" : "1")};
  height: 56px;
  padding: 8px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  cursor: pointer;
  width: ${({ width }) => width || "100%"};
`;
