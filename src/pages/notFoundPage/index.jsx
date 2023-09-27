import React from "react";
import {
  InsideWrapper,
  MainWrapper,
  NotFoundSubtitle,
  NotFoundText,
} from "./styled";

const NotFound = () => {
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
