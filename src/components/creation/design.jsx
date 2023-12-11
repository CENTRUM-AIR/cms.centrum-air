import React, { useEffect, useState } from "react";
import { useCreationConfig } from "../../utils/creation-config";
import {
  ButtonHolder,
  CloseText,
  FlexContainer,
  MainTitle,
  MainWrapper,
  ModalBackdrop,
  WarningText,
  Wrapper,
} from "./styled";
import { ReactComponent as CloseIcon } from "../../icons/close.svg";
import { StyledButton, StyledInput, StyledTextArea } from "../../shared_styled";
import { Dropzone } from "../dropzone";
import SVG from "react-inlinesvg";
import { LanguageChange } from "../changeLanguage";
import { useDispatch, useSelector } from "react-redux";
import { setIsDone as setIsDoneMainpage } from "../../store/create-main-page";
import { setIsDone as setIsDoneAS } from "../../store/create-additional-service";
import { setIsDone as setIsDoneDestinations } from "../../store/create-destinations";
import { setIsDone as setIsDoneCountries } from "../../store/create-countries";
import { setIsDone as setIsDoneCharters } from "../../store/create-charter";
import { setIsDone as setIsDoneNews } from "../../store/create-news";
import { setIsDone as setIsDoneUser } from "../../store/create-user";
import { setIsDone as setIsDoneFaq } from "../../store/create-faq";

const Design = ({
  actionType,
  titleText,
  onClose,
  language,
  nextLanguage,
  inputTitle,
  setInputTitle,
  shortDescription,
  setShortDescription,
  inputPrice,
  inputColor,
  setInputPrice,
  destination,
  setDestination,
  description,
  setDescription,
  image,
  setImage,
  code,
  setCityCode,
  phoneNumber,
  setNewPhoneNumber,
  publishInfo,
  setColor,
}) => {
  const {
    smallDesc,
    destination: showDestination,
    price,
    isTextArea,
    fileType,
    cityCode,
    countryName,
    cityName,
    mainText,
    isFileNeeded,
    isPhoneNumber,
    fromCityName,
    selector,
    color,
  } = useCreationConfig(actionType);
  const dispatch = useDispatch();
  const { isDone } = useSelector(selector);
  const [openDropzone, setOpenDropzone] = useState(false);
  const [isPublishedPressed, setIsPublishedPressed] = useState(false);

  const dispatchAllClosing = () => {
    dispatch(setIsDoneMainpage(false));
    dispatch(setIsDoneAS(false));
    dispatch(setIsDoneDestinations(false));
    dispatch(setIsDoneCountries(false));
    dispatch(setIsDoneCharters(false));
    dispatch(setIsDoneNews(false));
    dispatch(setIsDoneUser(false));
    dispatch(setIsDoneFaq(false));
  };
  const isSvg = () => {
    if (typeof image?.photo === "string")
      return image?.photo?.includes("svg") ? true : false;
    return false;
  };
  useEffect(() => {
    if (isPublishedPressed && isDone) {
      dispatchAllClosing();
      onClose();
    }
  }, [isDone, isPublishedPressed]);

  const actualPublish = () => {
    setIsPublishedPressed(true);
    publishInfo();
  };
  return (
    <>
      <MainWrapper>
        <Wrapper>
          <MainTitle>
            {titleText}
            <CloseText onClick={onClose}>
              <CloseIcon /> закрыть
            </CloseText>
          </MainTitle>
          <LanguageChange language={language} changeLang={nextLanguage} />
          {mainText && (
            <>
              <span>Заголовок</span>
              <StyledTextArea
                value={inputTitle}
                onChange={(e) => setInputTitle(e.target.value)}
                placeholder="Введите заголовок"
              />
            </>
          )}
          {smallDesc && (
            <>
              <span>Краткое описание</span>
              <StyledTextArea
                value={shortDescription}
                onChange={(e) => setShortDescription(e.target.value)}
                placeholder="Введите краткое описание"
              />
            </>
          )}
          {price && (
            <>
              <span>Цена</span>
              <StyledInput
                value={inputPrice}
                onChange={(e) => setInputPrice(e.target.value)}
                placeholder="Введите цену"
              />
            </>
          )}
          {color && (
            <>
              <span>Цвет</span>
              <StyledInput
                value={inputColor}
                onChange={(e) => setColor(e.target.value)}
                placeholder="Введите цвет"
              />
            </>
          )}
          {showDestination && (
            <FlexContainer>
              <span>Направление</span>
              <WarningText>*e.g.: Из Ташкента и обратно</WarningText>
              <StyledInput
                placeholder="Введите направление"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              />
            </FlexContainer>
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
          {image?.photo && (
            <>
              {isSvg() ? (
                <SVG src={image.photo} width="100px" height="100px" />
              ) : (
                <img
                  width="200px"
                  height="100px"
                  src={image.photo?.preview || image.photo}
                  alt="expected"
                />
              )}
            </>
          )}
          {fromCityName && (
            <>
              <span>С Какого Города</span>
              <StyledInput
                value={shortDescription}
                onChange={(e) => setShortDescription(e.target.value)}
                placeholder="Введите имя Города"
              />
            </>
          )}
          {cityName && (
            <>
              <span>Город</span>
              <StyledInput
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Введите имя Города"
              />
            </>
          )}
          {countryName && (
            <>
              <span>Страна</span>
              <StyledInput
                value={inputTitle}
                onChange={(e) => setInputTitle(e.target.value)}
                placeholder="Введите имя Страны"
              />
            </>
          )}
          {cityCode && (
            <>
              <span>Код Города</span>
              <StyledInput
                value={code}
                onChange={(e) => setCityCode(e.target.value.toUpperCase())}
                placeholder="Введите код Города"
              />
            </>
          )}
          {isPhoneNumber && (
            <>
              <span>Номер Телефона</span>
              <StyledInput
                value={phoneNumber}
                onChange={(e) => setNewPhoneNumber(e.target.value)}
                placeholder="Введите номер телефона Города"
              />
            </>
          )}
          {isFileNeeded && (
            <StyledButton onClick={() => setOpenDropzone(true)}>
              Загрузить файл обложки или иконку
            </StyledButton>
          )}
          <ButtonHolder>
            <StyledButton width="138px" onClick={actualPublish}>
              Опубликовать
            </StyledButton>
            <StyledButton width="80px" onClick={() => nextLanguage("", true)}>
              Далее
            </StyledButton>
          </ButtonHolder>
        </Wrapper>
      </MainWrapper>
      <ModalBackdrop />
      {openDropzone && (
        <Dropzone
          fileType={fileType}
          setImage={setImage}
          onClose={() => setOpenDropzone(false)}
        />
      )}
    </>
  );
};

export default Design;
