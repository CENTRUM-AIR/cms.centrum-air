import styled from "styled-components/macro";

export const StyledWrapper = styled.div`
  min-height: 200px;
  outline: none;
  cursor: text;
  border: none;
  background-color: ${({ bc }) => bc || "#f3f6fc"};
  border-radius: 12px;
  padding: 15px 15px 0;
  font-size: 16px;
  font-style: normal;
  font-family: "Inter", sans-serif;
  font-weight: 400;
  resize: vertical;
  border: 1px solid #dde5f6;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const StyledButton = styled.button`
  outline: none;
  background: none;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 8px;
  cursor: pointer;
  padding: 4px;
  height: 25px;
  color: ${({ active }) => (active ? "#000" : "grey")};
  svg {
    width: 15px;
    height: 15px;
  }
`;

export const PickerWrapper = styled.div`
  display: flex;
  width: 200px;
  flex-direction: column;
  gap: 15px;
  align-items: center;
  justify-content: center;
`;
