import React, { useEffect, useState } from "react";
import {
  ButtonHolder,
  CloseText,
  MainTitle,
  ModalBackdrop,
  Progression,
  ProgressionDash,
  WarningText,
  Wrapper,
} from "./styled";
import { ReactComponent as CloseIcon } from "../../icons/close.svg";
import { ReactComponent as Done } from "../../icons/done.svg";
import { ReactComponent as InProgress } from "../../icons/in-progress.svg";
import { StyledButton, StyledInput, StyledTextArea } from "../../shared_styled";
import { useDispatch, useSelector } from "react-redux";
import {
  setServiceEnglish,
  setServiceIcon,
  setServiceRussian,
  setServiceUzbek,
} from "../../store/create-additional-service";
import { getServices } from "../../store";

export const Creation = ({ title, onClose, isTextArea, smallDesc }) => {
  const dispatch = useDispatch();
  const {
    title_uz,
    title_ru,
    title_en,
    description_uz,
    description_ru,
    description_en,
    small_description_uz,
    small_description_ru,
    small_description_en,
    icon,
  } = useSelector(getServices);
  const [inputTitle, setInputTitle] = useState("");
  const [description, setDescription] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [image, setImage] = useState("");
  const [type, setType] = useState("ru");
  const [canPublish, setCanPublish] = useState(false);

  const moveToNext = ({ newType }) => {
    if (inputTitle && description && shortDescription && image) {
      dispatch(setServiceIcon(image));
      switch (type) {
        case "uz":
          dispatch(
            setServiceUzbek({
              title: inputTitle,
              description,
              small_description: shortDescription,
            })
          );
          break;
        case "ru":
          dispatch(
            setServiceRussian({
              title: inputTitle,
              description,
              small_description: shortDescription,
            })
          );
          break;
        case "en":
          dispatch(
            setServiceEnglish({
              title: inputTitle,
              description,
              small_description: shortDescription,
            })
          );
          break;
        default:
          break;
      }
    }
    setType(newType || (type === "ru" ? "en" : type === "en" ? "uz" : "ru"));
  };

  useEffect(() => {
    setDescription("");
    setInputTitle("");
    setShortDescription("");
  }, [type]);

  const handlePublish = () => {
    if (
      title_uz &&
      title_ru &&
      title_en &&
      description_uz &&
      description_ru &&
      description_en &&
      small_description_uz &&
      small_description_ru &&
      small_description_en &&
      icon
    ) {
      fetch("https://node.centrum-air.com/services", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title_uz,
          title_ru,
          title_en,
          description_uz,
          description_ru,
          description_en,
          small_description_uz,
          small_description_ru,
          small_description_en,
          icon,
        }),
      });
    }
  };

  useEffect(() => {
    if (
      title_uz &&
      title_ru &&
      title_en &&
      description_uz &&
      description_ru &&
      description_en &&
      small_description_uz &&
      small_description_ru &&
      small_description_en &&
      icon
    ) {
      setCanPublish(true);
    }
  }, [
    title_uz,
    title_ru,
    title_en,
    description_uz,
    description_ru,
    description_en,
    small_description_uz,
    small_description_ru,
    small_description_en,
    icon,
  ]);

  return (
    <>
      <Wrapper>
        <MainTitle>
          {title || "Создать"}
          <CloseText onClick={onClose}>
            <CloseIcon /> закрыть
          </CloseText>
        </MainTitle>
        <Progression>
          <CloseText done={true} onClick={() => moveToNext("ru")}>
            {type === "ru" ? <Done /> : <InProgress />}
            Русский
          </CloseText>
          <ProgressionDash />
          <CloseText onClick={() => moveToNext("en")}>
            {type === "en" ? <Done /> : <InProgress />}
            English
          </CloseText>
          <ProgressionDash />
          <CloseText onClick={() => moveToNext("uz")}>
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
        <span>Иконка</span>
        <StyledTextArea
          value={image}
          placeholder="Вставьте СВГ иконку"
          onChange={(e) => setImage(e.target.value)}
        />
        <StyledButton width="247px">
          Загрузить файл обложки или иконку
        </StyledButton>
        <ButtonHolder>
          <StyledButton
            disabled={!canPublish}
            onClick={handlePublish}
            width="138px"
          >
            Опубликовать
          </StyledButton>
          <StyledButton width="80px" onClick={moveToNext}>
            Далее
          </StyledButton>
        </ButtonHolder>
      </Wrapper>
      <ModalBackdrop />
    </>
  );
};
