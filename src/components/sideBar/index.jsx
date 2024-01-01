import React, { Fragment } from "react";
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
import { useLocation, useNavigate } from "react-router-dom";
import { sideBarItems } from "./sideBar";
import Cookies from "js-cookie";

export const SideBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const logOut = () => {
    Cookies.remove("login");
    Cookies.remove("role");
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
            <Fragment key={item.id}>
              {item?.isCanSee.includes(Cookies.get("role")?.toLowerCase()) ? (
                <MenuItem
                  isselected={
                    item?.href === location.pathname ? "true" : undefined
                  }
                  onClick={() => navigate(item.href)}
                >
                  {item.icon}
                  <p>{item.text}</p>
                </MenuItem>
              ) : null}
            </Fragment>
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
