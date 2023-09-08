import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { SideBar } from "../sideBar";
import api from "../../utils/api";
import { getUser } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../store/auth";

export const IsAuth = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { login } = useSelector(getUser);
  useEffect(() => {
    if (!login) {
      api
        .get("/users/isAuthorized")
        .then((res) => {
          if (res.status === 401) {
            // TODO: change later
            navigate("/login");
          }
          if (res.status === 200 || res.status === 201) {
            dispatch(
              setUser({
                login: "exists",
                role: "user",
              })
            );
            navigate("/");
          }
        })
        .catch((e) => {
          navigate("/login");
          console.log(e);
        });
    }
  }, []);

  return (
    <>
      {location.pathname !== "/login" && <SideBar />}
      {children}
    </>
  );
};
