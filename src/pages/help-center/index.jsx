import React, { useEffect, useState } from "react";
import { SideMenu } from "./sideMenu";
import { LanguageChange } from "../../components/changeLanguage";
import { MainWrapper } from "./styled";
import { StyledButton, StyledInput, StyledTextArea } from "../../shared_styled";
import { PRESSCENTER, SUPERADMIN } from "../../constants";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getUser } from "../../store";

const CORRECT_ROLES = [SUPERADMIN, PRESSCENTER];

const HelpCenter = () => {
  const navigate = useNavigate();
  const { role } = useSelector(getUser);
  const [language, setLanguage] = useState("ru");
  const nextLanguage = (newType, goNext) => {
    if (goNext) {
      if (language === "ru") setLanguage("en");
      else if (language === "en") setLanguage("uz");
      else if (language === "uz") setLanguage("ru");
    } else {
      setLanguage(newType);
    }
  };

  useEffect(() => {
    if (!CORRECT_ROLES.includes(role)) {
      navigate("/not-found");
    }
  }, [role, navigate]);
  return (
    <>
      <SideMenu />
      <MainWrapper>
        <LanguageChange
          nextButton
          language={language}
          changeLang={nextLanguage}
        />
        <StyledInput placeholder="Текст вопроса" bc="#FFF" />
        <StyledTextArea
          placeholder="Ответ на вопрос"
          bc="#FFF"
          height="400px"
        />
        <StyledButton>Опубликовать вопрос</StyledButton>
      </MainWrapper>
    </>
  );
};

export default HelpCenter;
