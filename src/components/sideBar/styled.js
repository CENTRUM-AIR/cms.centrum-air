import styled from "styled-components/macro";

export const Wrapper = styled.div`
  background-color: #fff;
  position: sticky;
  left: 0;
  top: 0;
  min-width: 272px;
  height: 100vh;
`;

export const Logo = styled.div`
  display: flex;
  /* margin-top: 10px; */
  padding: 10px 30px;
  background-color: rgba(255, 255, 255, 1);
  border-bottom: 1px solid rgba(236, 234, 235, 1);
`;

export const MenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 25px 20px;
`;

export const MenuItem = styled.div`
  border-radius: 15px;
  padding: 14px;
  display: flex;
  gap: 10px;
  font-size: 18px;
  font-style: normal;
  align-items: center;
  cursor: pointer;
  &:hover {
    background-color: rgba(243, 246, 252, 1);
  }
`;
