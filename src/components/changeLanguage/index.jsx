import React from "react";

import { ReactComponent as Done } from "../../icons/done.svg";
import { ReactComponent as InProgress } from "../../icons/in-progress.svg";
import { CloseText, Progression, ProgressionDash } from "./styled";
import { StyledButton } from "../../shared_styled";

export const LanguageChange = ({ language, changeLang, nextButton }) => {
  return (
    <Progression>
      <CloseText
        done={language === "ru" ? "true" : null}
        onClick={() => changeLang("ru")}
      >
        {language === "ru" ? <Done /> : <InProgress />}
        Русский
      </CloseText>
      <ProgressionDash />
      <CloseText
        done={language === "en" ? "true" : null}
        onClick={() => changeLang("en")}
      >
        {language === "en" ? <Done /> : <InProgress />}
        English
      </CloseText>
      <ProgressionDash />
      <CloseText
        done={language === "uz" ? "true" : null}
        onClick={() => changeLang("uz")}
      >
        {language === "uz" ? <Done /> : <InProgress />}
        Uzbek
      </CloseText>
      {nextButton && <StyledButton onClick={()=>changeLang(null, true)} width="400px">Далее</StyledButton>}
    </Progression>
  );
};
