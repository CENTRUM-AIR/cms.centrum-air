import styled from "styled-components/macro";

export const StyledInput = styled.input`
  height: 56px;
  outline: none;
  border: none;
  width: ${({ width }) => width};
  background-color: ${({ bc }) => bc || "#f3f6fc"};
  border-radius: 12px;
  padding: 0 15px;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  border: 1px solid #dde5f6;
`;

export const StyledTextArea = styled.textarea`
  min-height: 61px;
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  outline: none;
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
`;

export const StyledButton = styled.button`
  border: none;
  outline: none;
  border-radius: 12px;
  background-color: ${({ secondary }) => (secondary ? "#fff" : "#174abc")};
  opacity: ${({ disabled }) => (disabled ? "0.5" : "1")};
  height: ${({ height }) => height || "56px"};
  padding: 8px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ secondary }) => (secondary ? "#727D97" : "#fff")};
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  cursor: pointer;
  width: ${({ width }) => width || "100%"};
`;

export const StyledSelect = styled.select`
  height: 56px;
  outline: none;
  border: none;
  background-color: ${({ bc }) => bc || "#f3f6fc"};
  border-radius: 12px;
  padding: 0 15px;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
`;

export const TableWrapper = styled.table`
  border-radius: 24px 24px;
  background: #fff;
  border-collapse: collapse;
  td,
  th {
    text-align: left;
    padding: 15px 20px;
    height: 100%;
    word-wrap: break-word;
    max-width: 200px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  tr {
    border-bottom: 1px solid #dddddd;
    &:last-child {
      border-bottom: none;
    }
  }
  th {
    color: #727d97;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
  }
`;

export const Option = styled.div`
  color: #174abc;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  display: flex;
  align-items: center;
  min-width: 100px;
  justify-content: center;
  gap: 10px;
  cursor: pointer;
  min-width: 150px;
`;

export const MainWrapperPages = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 0 20px;
  svg {
    cursor: pointer;
  }
`;

export const NoInfo = styled.p`
  background-color: #fff;
  padding: 20px;
  border-radius: 15px;
`;
