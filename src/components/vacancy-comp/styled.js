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

export const Image = styled.img`
  height: 300px;
`;

export const Title = styled.h1``;

export const SmallDescription = styled.p``;

export const Description = styled.p``;

export const EmptyHolder = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  height: 300px;
  width: 580px;
  align-items: center;
  border: 1px solid #e5e5e5;
  padding: 20px;
  gap: 20px;
  cursor: pointer;
  background-color: #fff;
  border-radius: 10px;
`;
