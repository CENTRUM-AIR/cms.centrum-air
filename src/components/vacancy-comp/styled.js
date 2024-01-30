import styled from "styled-components/macro";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  border: 1px solid #e5e5e5;
  padding: 20px;
  cursor: pointer;
  gap: 10px;
  background-color: #fff;
  border-radius: 10px;
`;

export const Title = styled.h2`
  margin: 0;
`;

export const Department = styled.p`
  color: #727d97;
`;

export const EmptyHolder = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  width: 80%;
  border: 1px solid #e5e5e5;
  padding: 20px;
  gap: 20px;
  cursor: pointer;
  background-color: #fff;
  border-radius: 10px;
`;
