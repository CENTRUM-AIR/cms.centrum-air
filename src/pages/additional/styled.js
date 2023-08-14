import styled from "styled-components/macro";

export const Wrapper = styled.div`
  margin: 23px 30px;
  width: 100%;
`;

export const IconWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

export const AddText = styled.button`
  outline: none;
  border: none;
  background-color: transparent;
  color: #174abc;
  font-size: 16px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
  border-radius: 15px;
  padding: 5px 10px;
  &:active {
    background-color: #f3f6fc;
  }
`;

export const ItemWrapper = styled.h1`
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  color: #727d97;
  background-color: #fff;
  padding: 15px;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const ItemText = styled.div`
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  color: #000;
  min-width: 200px;
  padding: 5px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #e5e5e5;
`;

// export const ItemDesc = styled.div`

// `;

export const ItemTextWrapper = styled.div`
  display:flex;
  width:100%;
  justify-content: space-between;
`;