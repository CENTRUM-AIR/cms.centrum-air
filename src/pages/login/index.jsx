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
import { getUser } from "../../store";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../store/auth";

export const LoginPage = () => {
  const { login: authLogin } = useSelector(getUser);
  const [login, setLogin] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!login || !password) {
        setError(true);
        return;
      }

      const data = await api.post("/users/login", { login, password });
      if (data.status === 201 || data.status === 200) {
        // TODO: change later
        dispatch(
          setUser({
            login,
            role: "superadmin",
          })
        );
        navigate("/");
      }
    } catch (error) {
      setError(true);
    }
  };
  useEffect(() => {
    console.log(authLogin);
    if (authLogin) {
      navigate("/");
    }
  }, []);
  return (
    <Global>
      <CentrumLogo width="137px" height="44px" />
      <Wrapper>
        <Holder>
          <Title>Войти</Title>
          <Subtitle>Введите ваш логин и пароль чтобы войти</Subtitle>
          <StyledForm error={error} onSubmit={handleSubmit}>
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