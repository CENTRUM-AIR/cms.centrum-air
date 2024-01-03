import styled from "styled-components/macro";

export const Image = styled.img`
  width: 580px;
  height: 400px;
  position: relative;
`;
export const PlusHolder = styled.div`
  width: 580px;
  height: 400px;
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
    width: 100px;
    height: 100px;
  }
`;
export const PlusCircle = styled.div`
  border-radius: 50%;
  border: 1px solid #174abc;
`;

export const Text = styled.div`
  position: absolute;
  color: white;
  z-index: 1;
  font-size: 42px;
  bottom: 100px;
  left: 100px;
  white-space: pre-line;
`;

export const Wrapper = styled.div`
  position: relative;
`;
