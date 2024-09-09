import styled from "styled-components/macro";

export const Wrapper = styled.div`
  background-color: #fff;
  border: 1px solid rgb(221, 229, 246);
  border-radius: 16px;
  width: 310px;
  display: flex;
  padding: 20px;
  gap: 15px;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
`;

export const Image = styled.img`
  width: 100px;
  border-radius: 15px;
  height: 90px;
  object-fit: cover;
`;

export const Text = styled.h3`
  margin: 0;
  font-weight: 700;
`;
export const RowDetail = styled.div`
  display: flex;
  gap: 10px;
`;

export const RowCheckBox = styled.div`
  label {
    display: flex;
    font-size: 12px;
    font-weight: 700;
  }
`;

export const Destination = styled.p`
  font-size: 14px;
  font-weight: 400;
  display: flex;
  align-items: center;
  color: rgb(114, 125, 151);
  width: 100%;
`;

export const TextHolder = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  justify-content: center;
`;

export const EmptyHolder = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
`;

export const Price = styled.span`
  color: rgb(23, 74, 188);
  font-size: 14px;
  margin-left: 20px;
`;
