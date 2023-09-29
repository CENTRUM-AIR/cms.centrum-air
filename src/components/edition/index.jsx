import React, { useState } from "react";
import { StyledButton, StyledInput, StyledTextArea } from "../../shared_styled";
import {
  ButtonHolder,
  CloseText,
  MainTitle,
  ModalBackdrop,
  Progression,
  ProgressionDash,
  WarningText,
  Wrapper,
} from "../creation/styled";

import { ReactComponent as CloseIcon } from "../../icons/close.svg";
import { ReactComponent as Done } from "../../icons/done.svg";
import { ReactComponent as InProgress } from "../../icons/in-progress.svg";
import Dropzone from "react-dropzone";

export const Edition = ({
  title,
  actionType,
  onClose,
  isTextArea,
  smallDesc,
  open,
  setEnglish,
  setRussian,
  setUzbek,
  setFile,
  defaulTitle = "",
  defaultDescription = "",
  defaultShortDescription = "",
  defaultImage = "",
}) => {
  const [language, setLanguage] = useState("ru");
  const [inputTitle, setInputTitle] = useState(defaulTitle);
  const [description, setDescription] = useState(defaultDescription);
  const [shortDescription, setShortDescription] = useState(
    defaultShortDescription
  );
  const [image, setImage] = useState(defaultImage);
  const [canPublish, setCanPublish] = useState(false);
  const [openDropzone, setOpenDropzone] = useState(false);
  const [error, setError] = useState(false);

  const collectData = () => {
    switch (actionType) {
      case "mainpage":
        if (language === "ru") {
          setRussian(inputTitle);
        }
        if (language === "en") {
          setEnglish(inputTitle);
        }
        if (language === "uz") {
          setUzbek(inputTitle);
        }
        setFile(image);
        break;
      default:
        break;
    }
  };

  const nextLanguage = (newType, goNext) => {
    collectData();
    if (goNext) {
      if (language === "ru") {
        setLanguage("en");
      } else if (language === "en") {
        setLanguage("uz");
      } else if (language === "uz") {
        setLanguage("ru");
      }
    } else {
      setLanguage(newType);
    }
  };

  const publishInfo = () => {};
  return (
    <>
      {open && (
        <>
          <Wrapper>
            <MainTitle>
              {title || "Создать"}
              <CloseText onClick={onClose}>
                <CloseIcon /> закрыть
              </CloseText>
            </MainTitle>
            <Progression>
              <CloseText
                done={language === "ru"}
                onClick={() => nextLanguage("ru")}
              >
                {language === "ru" ? <Done /> : <InProgress />}
                Русский
              </CloseText>
              <ProgressionDash />
              <CloseText
                done={language === "en"}
                onClick={() => nextLanguage("en")}
              >
                {language === "en" ? <Done /> : <InProgress />}
                English
              </CloseText>
              <ProgressionDash />
              <CloseText
                done={language === "uz"}
                onClick={() => nextLanguage("uz")}
              >
                {language === "uz" ? <Done /> : <InProgress />}
                Uzbek
              </CloseText>
            </Progression>
            <span>Заголовок</span>
            <WarningText>
              *Чтобы перенести текст на новую строку пропишите \n (e.g: новая
              \nстрока)
            </WarningText>
            <StyledInput
              value={inputTitle}
              onChange={(e) => setInputTitle(e.target.value)}
              placeholder="Введите заголовок"
            />
            {smallDesc && (
              <>
                <span>Краткое описание</span>
                <StyledInput
                  value={shortDescription}
                  onChange={(e) => setShortDescription(e.target.value)}
                  placeholder="Введите краткое описание"
                />
              </>
            )}
            {isTextArea && (
              <>
                <span>содержание</span>
                <StyledTextArea
                  value={description}
                  placeholder="Введите содержение"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </>
            )}
            {image && (
              <>
                <img width="200px" src={image.preview} alt="loaded" />
              </>
            )}
            <StyledButton onClick={() => setOpenDropzone(true)}>
              Загрузить файл обложки или иконку
            </StyledButton>
            <ButtonHolder>
              {/* disabled={!canPublish} */}
              <StyledButton width="138px" onClick={publishInfo}>
                Изменить
              </StyledButton>
              <StyledButton width="80px" onClick={() => nextLanguage("", true)}>
                Далее
              </StyledButton>
            </ButtonHolder>
          </Wrapper>
          <ModalBackdrop />
          {openDropzone && (
            <Dropzone
              setImage={setImage}
              onClose={() => setOpenDropzone(false)}
            />
          )}
        </>
      )}
    </>
  );
};
