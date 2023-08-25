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
  onSubmit,
  setEnglish,
  setRussian,
  setUzbek,
  setFile,
  defaulTitle = "",
  defaultDescription = "",
  defaultShortDescription = "",
  defaultImage = "",
}) => {
  const [type, setType] = useState("ru");
  const [inputTitle, setInputTitle] = useState(defaulTitle);
  const [description, setDescription] = useState(defaultDescription);
  const [shortDescription, setShortDescription] = useState(defaultShortDescription);
  const [image, setImage] = useState(defaultImage);
  const [canPublish, setCanPublish] = useState(false);
  const [openDropzone, setOpenDropzone] = useState(false);
  const [error, setError] = useState(false);

  const collectData = () => {
    switch (actionType) {
      case "mainpage":
        if (type === "ru") {
          setRussian(inputTitle);
        }
        if (type === "en") {
          setEnglish(inputTitle);
        }
        if (type === "uz") {
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
      if (type === "ru") {
        setType("en");
      } else if (type === "en") {
        setType("uz");
      } else if (type === "uz") {
        setType("ru");
      }
    } else {
      setType(newType);
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
                done={type === "ru"}
                onClick={() => nextLanguage("ru")}
              >
                {type === "ru" ? <Done /> : <InProgress />}
                Русский
              </CloseText>
              <ProgressionDash />
              <CloseText
                done={type === "en"}
                onClick={() => nextLanguage("en")}
              >
                {type === "en" ? <Done /> : <InProgress />}
                English
              </CloseText>
              <ProgressionDash />
              <CloseText
                done={type === "uz"}
                onClick={() => nextLanguage("uz")}
              >
                {type === "uz" ? <Done /> : <InProgress />}
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
