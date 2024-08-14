import styled from "styled-components/macro";

export const Image = styled.img`
  position: relative;
`;
export const PlusHolder = styled.div`
  width: 150px;
  height: 200px;
  position: relative;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  gap: 20px;
  color: #174abc;
  justify-content: center;
  align-items: center;
  border: 1px solid #174abc;
  svg {
    width: 40px;
    height: 40px;
  }
`;
export const PlusCircle = styled.div`
  border-radius: 50%;
  border: 1px solid #174abc;
`;

export const Text = styled.div`
  z-index: 1;
  font-size: 16px;
  white-space: pre-line;
`;

export const Wrapper = styled.div`
  position: relative;
`;

export const Holder = styled.div`
  border: 1px solid black;
  height: 180px;
  width: 130px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  gap: 10px;
`;
