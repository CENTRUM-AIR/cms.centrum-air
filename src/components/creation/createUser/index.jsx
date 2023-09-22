import React from "react";
import {
  CloseText,
  MainTitle,
  MainWrapper,
  ModalBackdrop,
  Wrapper,
} from "../styled";
import {
  StyledButton,
  StyledInput,
  StyledSelect,
} from "../../../shared_styled";
import { ReactComponent as CloseIcon } from "../../../icons/close.svg";
import { ROLES } from "../../../constants";

export const CreateUser = ({ onClose, userId, title }) => {
  return (
    <>
      <MainWrapper>
        <Wrapper>
          <MainTitle>
            {title || "Создать пользователя"}
            <CloseText onClick={onClose}>
              <CloseIcon /> закрыть
            </CloseText>
          </MainTitle>
          <span>Логин</span>
          <StyledInput placeholder="Введите Логин" />
          <span>Пароль</span>
          <StyledInput placeholder="Введите Пароль" />
          <span>Роль</span>
          <StyledSelect name="cars" id="cars">
            {ROLES.map((role) => (
              <option id={role} value={role}>
                {role}
              </option>
            ))}
          </StyledSelect>
          <StyledButton>Сохранить</StyledButton>
        </Wrapper>
      </MainWrapper>
      <ModalBackdrop />
    </>
  );
};
