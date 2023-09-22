import React from "react";
import { ButtonWrapper, HeaderWrapper, SubHeaderWrapper } from "./styled";
import { Option, StyledButton, StyledInput } from "../../shared_styled";

export const NewsHeader = () => {
  return (
    <HeaderWrapper>
      <ButtonWrapper>
        <StyledButton height="40px">Опубликовано</StyledButton>
        <StyledButton height="40px" secondary="true">
          Черновики
        </StyledButton>
      </ButtonWrapper>
      <SubHeaderWrapper>
        <Option>filters</Option>
        <Option>Создать новость</Option>
        <StyledInput width="100%" placeholder="Поиск" bc="#FFF" />
      </SubHeaderWrapper>
    </HeaderWrapper>
  );
};
