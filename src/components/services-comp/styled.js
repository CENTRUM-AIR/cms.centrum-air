import styled from "styled-components/macro";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 580px;
  border: 1px solid #e5e5e5;
  padding: 20px;
  gap: 20px;
  cursor: pointer;
  background-color: #fff;
  border-radius: 10px;
`;

export const Title = styled.h3`
  font-size: 30px;
  font-weight: 700;
  margin: 0px;
`;

export const SmallDescription = styled.span`
  color: rgb(23, 74, 188);
  font-size: 16px;
`;

export const Description = styled.p`
  color: rgb(114, 125, 151);
  font-size: 14px;
`;

export const EmptyHolder = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  color: rgb(23, 74, 188);
  height: 100%;
`;
