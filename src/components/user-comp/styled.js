import styled from "styled-components/macro";

export const Wrapper = styled.div`
  background-color: ${({ isuser }) => (isuser ? "#e5e5e5" : "#fff")};
  min-width: 200px;
  height: 200px;
  border-radius: 10px;
  padding: 20px 10px 10px 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  cursor: pointer;
`;

export const YourUser = styled.span`
  color: #174abc;
  height: 20px;
`;

export const Title = styled.h2`
  margin: 0;
  font-size: 20px;
  font-weight: 700;
`;

export const TextHolder = styled.div`
  display: flex;
  gap: 20px;
  width: 100%;
  align-items: center;
`;

export const EmptyHolder = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 10px;
`;
