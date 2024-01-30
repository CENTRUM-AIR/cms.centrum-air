import styled from "styled-components/macro";

export const NewsContainer = styled.div`
  width: 300px;
  height: 250px;
  background-color: #fff;
  border-radius: 15px;
  border: 1px solid #dde5f6;
  overflow: hidden;
`;

export const NewsTitle = styled.h4`
  margin: 0;
  padding: 10px;
`;

export const Image = styled.img`
  width: 100%;
  height: 150px;
`;

export const EmptyHolder = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;
