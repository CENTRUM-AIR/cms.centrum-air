import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { SideBar } from "../sideBar";
import api from "../../utils/api";
import Cookies from "js-cookie";

export const IsAuth = ({ children, path }) => {
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (!Cookies.get("role")) {
      api
        .get("/users/isAuthorized")
        .then((res) => {
          if (res.status === 401) {
            navigate("/login");
          }
          if (res.status === 200 || res.status === 201) {
            Cookies.set("role", res.data);

            navigate(path);
          }
        })
        .catch((e) => {
          navigate("/login");
        });
    }
  }, []);

  return (
    <>
      {location.pathname !== "/login" && location.pathname !== "/not-found" && (
        <SideBar />
      )}
      {children}
    </>
  );
};
