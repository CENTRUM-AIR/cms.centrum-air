import styled from "styled-components/macro";

export const TableWrapper = styled.table`
  border-radius: 24px 24px;
  background: #fff;
  border-collapse: collapse;
  td,
  th {
    border-bottom: 1px solid #dddddd;
    text-align: left;
    padding: 12px;
    height: 100%;
    word-wrap: break-word;
  }
  th {
    color: #727d97;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
  }
`;

export const StyledPassword = styled.td`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const StyledSpan = styled.span`
  width: 80px;
`;

export const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 0 20px;
`;
