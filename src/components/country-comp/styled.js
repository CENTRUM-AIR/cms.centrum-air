import styled from "styled-components/macro";

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  border-radius: 15px;
  border: 1px solid #e5e5e5;
  padding: 10px 15px;
  gap: 20px;
  width: 900px;
  height: 40px;
  cursor: pointer;
  background-color: #fff;
  p {
    margin: 0;
    width: 300px;
  }
  span {
    text-transform: capitalize;
    color: rgb(114, 125, 151);
  }
`;
