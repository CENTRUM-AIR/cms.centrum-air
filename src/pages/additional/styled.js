import styled from "styled-components/macro";

export const Wrapper = styled.div`
  margin: 23px 30px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
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

export const ItemWrapper = styled.div`
  font-size: 20px;
  font-style: normal;
  margin: 0 !important;
  padding: 0;
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
  display: flex;
  align-items: center;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  height: 16px;
  width: ${({ desc }) => (desc ? "100%" : "auto")};
`;

export const ItemActions = styled.div`
  display: flex;
  flex: 1;
  gap: 10px;
  align-items: center;
  justify-content: flex-end;
  svg {
    cursor: pointer;
  }
`;

export const ItemTextWrapper = styled.div`
  display: flex;
  width: 100%;
  gap: 30px;
`;


export const ButtonsWrapper = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
  width:100%;
`;