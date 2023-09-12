import React, { useEffect, useState } from "react";
import {
  ButtonHolder,
  CloseText,
  FlexContainer,
  MainTitle,
  MainWrapper,
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
import { Dropzone } from "../dropzone";
import { useSelector } from "react-redux";
import { Modal } from "../Modal";
import api, { formDataApi } from "../../utils/api";
import { creationConfig } from "../../utils/creation-config";
import SVG from "react-inlinesvg";

export const Creation = ({
  actionType,
  onClose,
  setEnglish,
  setRussian,
  setUzbek,
  setFile,
  setPrice,
  isEdition,
  setCode,
  setPhoneNumber,
}) => {
  const {
    title,
    selector,
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
  } = creationConfig(actionType);
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
    destination_uz,
    destination_ru,
    destination_en,
    price: selectorPrice,
    photo,
    country_en,
    country_ru,
    country_uz,
    city_en,
    city_ru,
    city_uz,
    city_code: selectorCityCode,
    phone_number: selectorPhoneNumber,
    from_city_en,
    from_city_ru,
    from_city_uz,
    to_city_en,
    to_city_ru,
    to_city_uz,
  } = useSelector(selector);

  const [language, setLanguage] = useState("ru");
  const [inputTitle, setInputTitle] = useState(""); // used as country name
  const [description, setDescription] = useState(""); // used as city (& to_city) name
  const [shortDescription, setShortDescription] = useState(""); // used as from_city name
  const [image, setImage] = useState("");
  const [inputPrice, setInputPrice] = useState("");
  const [destination, setDestination] = useState("");
  const [code, setCityCode] = useState("");
  const [phoneNumber, setNewPhoneNumber] = useState("");
  const [openDropzone, setOpenDropzone] = useState(false);
  const [error, setError] = useState(false);
  const getCorrectData = () => {
    let mainInfo;
    let isObj;
    switch (actionType) {
      case "mainpage":
        const formDataMainPage = new FormData();
        formDataMainPage.append("title_ru", title_ru || inputTitle);
        formDataMainPage.append("title_en", title_en || inputTitle);
        formDataMainPage.append("title_uz", title_uz || inputTitle);
        if (image?.photo?.preview) {
          formDataMainPage.append("file", image.photo);
        }
        mainInfo = formDataMainPage;
        isObj = false;
        break;
      case "offers":
        const formDataDest = new FormData();
        formDataDest.append("title_ru", title_ru || inputTitle);
        formDataDest.append("title_en", title_en || inputTitle);
        formDataDest.append("title_uz", title_uz || inputTitle);

        formDataDest.append("description_ru", description_ru || description);
        formDataDest.append("description_en", description_en || description);
        formDataDest.append("description_uz", description_uz || description);

        formDataDest.append("destination_ru", destination_ru || destination);
        formDataDest.append("destination_en", destination_en || destination);
        formDataDest.append("destination_uz", destination_uz || destination);
        if (image?.photo?.preview) {
          formDataDest.append("file", image?.photo);
        }
        if (inputPrice) {
          formDataDest.append(
            "price",
            selectorPrice?.price || inputPrice?.price
          );
        }
        mainInfo = formDataDest;
        isObj = false;
        break;
      case "services":
        const requestBody = {
          title_ru: title_ru || inputTitle,
          title_en: title_en || inputTitle,
          title_uz: title_uz || inputTitle,
          description_ru: description_ru || description,
          description_en: description_en || description,
          description_uz: description_uz || description,
          small_description_ru: small_description_ru || shortDescription,
          small_description_en: small_description_en || shortDescription,
          small_description_uz: small_description_uz || shortDescription,
        };
        if (image?.photo) {
          requestBody.icon = image.photo;
        }
        mainInfo = requestBody;
        isObj = true;
        break;
      case "countries":
        const requestBodyCountries = {
          country_ru: country_ru || inputTitle,
          country_en: country_en || inputTitle,
          country_uz: country_uz || inputTitle,
          city_ru: city_ru || description,
          city_en: city_en || description,
          city_uz: city_uz || description,
          city_code: selectorCityCode || code,
        };
        mainInfo = requestBodyCountries;
        isObj = true;
        break;
      case "charters":
        const requestBodyCharters = {
          to_city_ru: to_city_ru || description,
          to_city_en: to_city_en || description,
          to_city_uz: to_city_uz || description,
          from_city_ru: from_city_ru || shortDescription,
          from_city_en: from_city_en || shortDescription,
          from_city_uz: from_city_uz || shortDescription,
          phone_number: selectorPhoneNumber || phoneNumber,
        };
        mainInfo = requestBodyCharters;
        isObj = true;
        break;
      default:
        break;
    }
    return { formData: mainInfo, isObj };
  };

  useEffect(() => {
    if (language === "ru") {
      setInputTitle(title_ru || "");
      setDescription(description_ru || "");
      setShortDescription(small_description_ru || "");
      setDestination(destination_ru || "");
      if (country_ru || city_ru) {
        setInputTitle(country_ru || "");
        setDescription(city_ru || "");
      }
      if (from_city_ru || to_city_ru) {
        setDescription(to_city_ru || "");
        setShortDescription(from_city_ru || "");
      }
    } else if (language === "en") {
      setInputTitle(title_en || "");
      setDescription(description_en || "");
      setShortDescription(small_description_en || "");
      setDestination(destination_en || "");
      if (country_en || city_en) {
        setInputTitle(country_en || "");
        setDescription(city_en || "");
      }
      if (from_city_en || to_city_en) {
        setDescription(to_city_en || "");
        setShortDescription(from_city_en || "");
      }
    } else if (language === "uz") {
      setInputTitle(title_uz || "");
      setDescription(description_uz || "");
      setShortDescription(small_description_uz || "");
      setDestination(destination_uz || "");
      if (country_uz || city_uz) {
        setInputTitle(country_uz || "");
        setDescription(city_uz || "");
      }
      if (from_city_uz || to_city_uz) {
        setDescription(to_city_uz || "");
        setShortDescription(from_city_uz || "");
      }
    }
    if (photo) {
      setImage(photo);
    }
    if (selectorPrice) {
      setInputPrice(selectorPrice);
    }
    if (selectorCityCode) {
      setCityCode(selectorCityCode);
    }

    if (selectorPhoneNumber) {
      setNewPhoneNumber(selectorPhoneNumber);
    }
  }, [language]);

  const collectData = () => {
    const readyData = {
      title: inputTitle,
      description,
      small_description: shortDescription,
      destination,
      country: inputTitle,
      city: description,
      to_city: description,
      from_city: shortDescription,
    };
    if (language === "ru") setRussian(readyData);
    if (language === "en") setEnglish(readyData);
    if (language === "uz") setUzbek(readyData);
    setPrice && setPrice(inputPrice);
    setFile && setFile(image);
    setCode && setCode(code);
    setPhoneNumber && setPhoneNumber(phoneNumber);
  };

  const nextLanguage = (newType, goNext) => {
    collectData();
    if (goNext) {
      if (language === "ru") setLanguage("en");
      else if (language === "en") setLanguage("uz");
      else if (language === "uz") setLanguage("ru");
    } else {
      setLanguage(newType);
    }
  };

  const sendInfo = async (method) => {
    const { formData, isObj } = getCorrectData();
    if (method === "POST") {
      if (isObj) {
        await api
          .post(`/${actionType}`, formData)
          .catch((err) => window.alert("Что-то пошло не так! \n" + err));
      } else {
        formDataApi
          .post(`/${actionType}`, formData)
          .catch((err) => window.alert("Что-то пошло не так! \n" + err));
      }
    } else if (method === "PATCH") {
      if (isObj) {
        await api
          .patch(`/${actionType}`, formData)
          .catch((err) => window.alert("Что-то пошло не так! \n" + err));
      } else {
        formDataApi
          .patch(`/${actionType}`, formData)
          .catch((err) => window.alert("Что-то пошло не так! \n" + err));
      }
    }
    onClose();
  };

  const isSvg = () => {
    if (typeof image?.photo === "string")
      return image?.photo?.includes("svg") ? true : false;
    return false;
  };

  const publishInfo = async () => {
    collectData();
    if (isEdition) {
      await sendInfo("PATCH");
    } else {
      await sendInfo("POST");
    }
    window.location.reload();
  };

  return (
    <>
      <MainWrapper>
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
                value={inputPrice?.price}
                onChange={(e) => setInputPrice({ price: e.target.value })}
                placeholder="Введите цену"
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
                <SVG src={image.photo} width="100px" />
              ) : (
                <img
                  width="200px"
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
            {/* disabled={!canPublish} */}
            <StyledButton width="138px" onClick={publishInfo}>
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
      {error && (
        <Modal onClose={() => setError(false)}>
          <p
            style={{
              color: "red",
              whiteSpace: "pre-line",
              textAlign: "center",
            }}
          >
            {error}
          </p>
        </Modal>
      )}
    </>
  );
};
