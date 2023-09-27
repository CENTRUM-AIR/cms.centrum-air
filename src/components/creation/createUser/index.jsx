import React, { useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { getNewUser, patchAllInfo, sendAllInfo } from "../../../store";
import { patchUser } from "../../../store/patch-api-info";
import { sendUsers } from "../../../store/send-api-info";

export const CreateUser = ({ onClose, userId, title }) => {
  const { login, role } = useSelector(getNewUser);
  const { error: patchError, sent: patchSent } = useSelector(patchAllInfo);
  const { error: sentError, sent } = useSelector(sendAllInfo);
  const dispatch = useDispatch();
  const [inputLogin, setInputLogin] = useState(login || "");
  const [inputPassword, setInputPassword] = useState("");
  const [inputRole, setInputRole] = useState(role || "pressCenter");
  const [isDataSent, setIsDataSent] = useState(false);

  const updateUser = () => {
    if (userId) {
      dispatch(
        patchUser({
          login: inputLogin,
          password: inputPassword,
          role: inputRole,
          id: userId,
        })
      );
    } else {
      dispatch(
        sendUsers({
          login: inputLogin,
          password: inputPassword,
          role: inputRole,
        })
      );
    }
    setIsDataSent(true);
  };

  useEffect(() => {
    if (isDataSent) {
      if (sentError || patchError)
        window.alert("Что-то пошло не так!", sentError);
      if (sent || patchSent) onClose();
    }
  }, [sent, sentError, onClose, patchError, isDataSent, patchSent]);

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
          <StyledInput
            value={inputLogin}
            placeholder="Введите Логин"
            onChange={(e) => setInputLogin(e.target.value)}
          />
          <span>Пароль</span>
          <StyledInput
            value={inputPassword}
            placeholder="Введите новый Пароль"
            onChange={(e) => setInputPassword(e.target.value)}
          />
          <span>Роль</span>
          <StyledSelect
            name="role"
            id="role"
            value={inputRole}
            onChange={(e) => setInputRole(e.target.value)}
          >
            {ROLES.map((role) => (
              <option id={role} value={role} key={role}>
                {role}
              </option>
            ))}
          </StyledSelect>
          <StyledButton onClick={updateUser}>Сохранить</StyledButton>
        </Wrapper>
      </MainWrapper>
      <ModalBackdrop />
    </>
  );
};
