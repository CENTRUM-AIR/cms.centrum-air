import Cookies from "js-cookie";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ROLES_TEXT } from "../../constants";
import {
  InsideWrapper,
  MainWrapper,
  NotFoundSubtitle,
  NotFoundText,
} from "./styled";

const NotFound = () => {
  const role = Cookies.get("role");
  const navigate = useNavigate();

  useEffect(() => {
    if (!ROLES_TEXT?.includes(role?.toLowerCase())) {
      Cookies.remove("role");
      navigate("/login");
    }
  }, [role, navigate]);
  return (
    <MainWrapper>
      <InsideWrapper>
        <NotFoundText>Страница не доступна</NotFoundText>
        <NotFoundSubtitle>
          Страницы либо не существует, либо у вас нет прав чтобы просматривать
          эту страницу
        </NotFoundSubtitle>
      </InsideWrapper>
    </MainWrapper>
  );
};

export default NotFound;
