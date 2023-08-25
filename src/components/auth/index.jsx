import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SideBar } from "../sideBar";
import api from "../../utils/api";
import { getUser } from "../../store";
import { useSelector } from "react-redux";

export const IsAuth = ({ children }) => {
  const navigate = useNavigate();
  const { login } = useSelector(getUser);

  useEffect(() => {
    if (!login) {
      api
        .get("/users/isAuthorized")
        .then((res) => {
          console.log(res);
          if (res.status === 401) {
            navigate("/login");
          }
          if (res.status === 200 || res.status === 201) {
            navigate("/");
          }
        })
        .catch((e) => {
          navigate("/login");
          console.log(e);
        });
    }
  }, [login, navigate]);

  return (
    <>
      <SideBar />
      {children}
    </>
  );
};
