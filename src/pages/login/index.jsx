import React, { useEffect } from "react";
import {
  Global,
  Holder,
  InputWrapper,
  StyledForm,
  StyledLabel,
  Subtitle,
  Title,
  Wrapper,
} from "./styled";
import { ReactComponent as CentrumLogo } from "../../icons/centrum.svg";
import { StyledButton, StyledInput } from "../../shared_styled";
import api from "../../utils/api";
import { useNavigate } from "react-router-dom";
import Cookie from "js-cookie";

export const LoginPage = () => {
  const [login, setLogin] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!login || !password) {
        setError(true);
        return;
      }
      const data = await api.post("/users/login", { login, password });
      // if (data.headers["set-cookie"]) {
      console.log(data.headers["set-cookie"]);
      // }
      if (data.status === 201 || data.status === 200) {
        Cookie.set("login", login);
        var expire = new Date();
        expire.setHours(expire.getHours() + 2);
        Cookie.set("role", data?.data.role, { expires: expire });
        Cookie.set("jwt", data?.data.token, { expires: expire });
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };

  return (
    <Global>
      <CentrumLogo width="137px" height="44px" />
      <Wrapper>
        <Holder>
          <Title>Войти</Title>
          <Subtitle>Введите ваш логин и пароль чтобы войти</Subtitle>
          <StyledForm error={error ? error : undefined} onSubmit={handleSubmit}>
            <InputWrapper>
              <StyledLabel>Логин</StyledLabel>
              <StyledInput
                value={login}
                onChange={(e) => {
                  setError(false);
                  setLogin(e.target.value);
                }}
                placeholder="Введите ваш логин"
              />
            </InputWrapper>
            <InputWrapper>
              <StyledLabel>Пароль</StyledLabel>
              <StyledInput
                type="password"
                value={password}
                onChange={(e) => {
                  setError(false);
                  setPassword(e.target.value);
                }}
                placeholder="Введите пароль"
              />
            </InputWrapper>
            <StyledButton type="submit">Войти</StyledButton>
          </StyledForm>
        </Holder>
      </Wrapper>
    </Global>
  );
};
