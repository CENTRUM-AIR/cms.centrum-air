import styled from "styled-components/macro";

export const Wrapper = styled.div`
  border-radius: 15px;
  border: 1px solid rgb(221, 229, 246);
  padding: 18px 20px;
  display: flex;
  flex-direction: column;
  gap: 30px;
  width: 100%;
  background-color: #fff;
  cursor: pointer;
`;

export const Title = styled.h3`
  margin: 0;
  font-size: 20px;
  font-weight: 700;
`;

export const EmptyHolder = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;
