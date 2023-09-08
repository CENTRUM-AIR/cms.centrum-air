import React from "react";
import {
  LogOut,
  Logo,
  MenuItem,
  MenuItemWrapper,
  MenuWrapper,
  Wrapper,
} from "./styled";
import { ReactComponent as CentrumLogo } from "../../icons/centrum.svg";
import api from "../../utils/api";
import { useNavigate } from "react-router-dom";
import { sideBarItems } from "./sideBar";

export const SideBar = () => {
  const navigate = useNavigate();
  const logOut = () => {
    api.post("/users/logout");
    navigate("/login");
  };
  return (
    <Wrapper>
      <Logo>
        <CentrumLogo width="137px" height="44px" />
      </Logo>
      <MenuWrapper>
        <MenuItemWrapper>
          {sideBarItems.map((item) => (
            <MenuItem key={item.id} onClick={() => navigate(item.href)}>
              {item.icon}
              <p>{item.text}</p>
            </MenuItem>
          ))}
        </MenuItemWrapper>
        <LogOut>
          <MenuItem onClick={logOut}>
            <p>Log out</p>
          </MenuItem>
        </LogOut>
      </MenuWrapper>
    </Wrapper>
  );
};
