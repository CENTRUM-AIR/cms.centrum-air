import React, { useState } from "react";
import { SideMenu } from "./sideMenu";
import { LanguageChange } from "../../components/changeLanguage";
import { MainWrapper } from "./styled";
import { StyledButton, StyledInput, StyledTextArea } from "../../shared_styled";

const HelpCenter = () => {
  const [language, setLanguage] = useState("ru");
  const nextLanguage = (newType, goNext) => {
    // collectData();
    if (goNext) {
      if (language === "ru") setLanguage("en");
      else if (language === "en") setLanguage("uz");
      else if (language === "uz") setLanguage("ru");
    } else {
      setLanguage(newType);
    }
  };
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
          width="96%"
          height="400px"
        />
        <StyledButton>Опубликовать вопрос</StyledButton>
      </MainWrapper>
    </>
  );
};

export default HelpCenter;
