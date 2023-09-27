import styled from "styled-components/macro";

export const Wrapper = styled.div`
  background-color: #fff;
  position: sticky;
  left: 0;
  top: 0;
  min-width: 272px;
  height: 100vh;
  display: flex;
  flex-direction: column;
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
  height: 100%;
  justify-content: space-between;
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
  svg {
    path {
      fill: ${({ isSelected }) => (isSelected ? "#174ABC" : null)};
      stroke: ${({ isSelected }) => (isSelected ? "#fff" : "#727D97")};
      stroke-width: ${({ isSelected }) => (isSelected ? "0.5" : "1.8")};
    }
  }
`;

export const LogOut = styled.div`
  /* flex: 1; */
`;

export const MenuItemWrapper = styled.div`
  /* flex: 3; */
`;
