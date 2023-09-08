import React, { useEffect, useState } from "react";
import {
  ButtonHolder,
  CloseText,
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
}) => {
  const {
    title,
    selector,
    smallDesc,
    destination: showDestination,
    price,
    isTextArea,
    fileType,
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
  } = useSelector(selector);

  const [type, setType] = useState("ru");
  const [inputTitle, setInputTitle] = useState("");
  const [description, setDescription] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [image, setImage] = useState("");
  const [inputPrice, setInputPrice] = useState("");
  const [destination, setDestination] = useState("");
  const [openDropzone, setOpenDropzone] = useState(false);
  const [error, setError] = useState(false);

  const getCorrectData = () => {
    let mainInfo;
    let isObj;
    switch (actionType) {
      case "mainpage":
        const formDataMainPage = new FormData();
        if (type === "ru") {
          formDataMainPage.append("ru", inputTitle);
          formDataMainPage.append("en", title_en);
          formDataMainPage.append("uz", title_uz);
        } else if (type === "en") {
          formDataMainPage.append("ru", title_ru);
          formDataMainPage.append("en", inputTitle);
          formDataMainPage.append("uz", title_uz);
        } else if (type === "uz") {
          formDataMainPage.append("ru", title_ru);
          formDataMainPage.append("en", title_en);
          formDataMainPage.append("uz", inputTitle);
        }
        console.log(image);
        if (image?.photo?.preview) {
          formDataMainPage.append("file", image.photo);
        }
        mainInfo = formDataMainPage;
        isObj = false;
        break;
      case "offers":
        const formDataDest = new FormData();
        if (type === "ru") {
          formDataDest.append("title_ru", inputTitle);
          formDataDest.append("title_en", title_en);
          formDataDest.append("title_uz", title_uz);

          formDataDest.append("description_ru", description);
          formDataDest.append("description_en", description_en);
          formDataDest.append("description_uz", description_uz);

          formDataDest.append("destination_ru", destination);
          formDataDest.append("destination_en", destination_en);
          formDataDest.append("destination_uz", destination_uz);
        } else if (type === "en") {
          formDataDest.append("title_ru", title_ru);
          formDataDest.append("title_en", inputTitle);
          formDataDest.append("title_uz", title_uz);

          formDataDest.append("description__ru", description_ru);
          formDataDest.append("description_en", description);
          formDataDest.append("description_uz", description_uz);

          formDataDest.append("destination__ru", destination_ru);
          formDataDest.append("destination_en", destination);
          formDataDest.append("destination_uz", destination_uz);
        } else if (type === "uz") {
          formDataDest.append("title_ru", title_ru);
          formDataDest.append("title_en", title_en);
          formDataDest.append("title_uz", inputTitle);

          formDataDest.append("description_ru", description_ru);
          formDataDest.append("description_en", description_en);
          formDataDest.append("description_uz", description);

          formDataDest.append("destination_ru", destination_ru);
          formDataDest.append("destination_en", destination_en);
          formDataDest.append("destination_uz", destination);
        }
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
        let requestBody = {};
        if (type === "ru") {
          requestBody = {
            title_ru: inputTitle,
            title_en: title_en,
            title_uz: title_uz,
            description_ru: description,
            description_en: description_en,
            description_uz: description_uz,
            small_description_ru: shortDescription,
            small_description_en: small_description_en,
            small_description_uz: small_description_uz,
          };
        } else if (type === "en") {
          requestBody = {
            title_ru: title_ru,
            title_en: inputTitle,
            title_uz: title_uz,
            description_ru: description_ru,
            description_en: description,

            description_uz: description_uz,
            small_description_ru: small_description_ru,
            small_description_en: shortDescription,
            small_description_uz: small_description_uz,
          };
        } else if (type === "uz") {
          requestBody = {
            title_ru: title_ru,
            title_en: title_en,
            title_uz: inputTitle,
            description_ru: description_ru,
            description_en: description_en,

            description_uz: description,
            small_description_ru: small_description_ru,
            small_description_en: small_description_en,
            small_description_uz: shortDescription,
          };
        }
        if (image?.photo) {
          requestBody.icon = image.photo;
        }
        mainInfo = requestBody;
        isObj = true;
        break;
      default:
        break;
    }
    return { formData: mainInfo, isObj };
  };

  useEffect(() => {
    if (type === "ru") {
      setInputTitle(title_ru || "");
      setDescription(description_ru || "");
      setShortDescription(small_description_ru || "");
      setDestination(destination_ru || "");
    } else if (type === "en") {
      setInputTitle(title_en || "");
      setDescription(description_en || "");
      setShortDescription(small_description_en || "");
      setDestination(destination_en || "");
    } else if (type === "uz") {
      setInputTitle(title_uz || "");
      setDescription(description_uz || "");
      setShortDescription(small_description_uz || "");
      setDestination(destination_uz || "");
    }
    if (photo) {
      setImage(photo);
    }
    if (selectorPrice) {
      setInputPrice(selectorPrice);
    }
  }, [type]);

  const collectData = () => {
    switch (actionType) {
      case "mainpage":
        if (type === "ru") {
          setRussian({ title: inputTitle });
        }
        if (type === "en") {
          setEnglish({ title: inputTitle });
        }
        if (type === "uz") {
          setUzbek({ title: inputTitle });
        }
        setFile(image);
        break;
      case "offers":
        if (type === "ru") {
          setRussian({
            title: inputTitle,
            description: description,
            destination: destination,
          });
        }
        if (type === "en") {
          setEnglish({
            title: inputTitle,
            description: description,
            destination: destination,
          });
        }
        if (type === "uz") {
          setUzbek({
            title: inputTitle,
            description: description,
            destination: destination,
          });
        }
        setPrice(inputPrice);
        setFile(image);
        break;
      case "services":
        if (type === "ru") {
          setRussian({
            title: inputTitle,
            description: description,
            small_description: shortDescription,
          });
        }
        if (type === "en") {
          setEnglish({
            title: inputTitle,
            description: description,
            small_description: shortDescription,
          });
        }
        if (type === "uz") {
          setUzbek({
            title: inputTitle,
            description: description,
            small_description: shortDescription,
          });
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

  const sendInfo = async (method) => {
    const { formData, isObj } = getCorrectData();
    console.log(formData, isObj);
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
    if (typeof image?.photo === "string") {
      return image?.photo?.includes("svg") ? true : false;
    }
    return false;
  };

  const publishInfo = async () => {
    collectData();
    if (isEdition) {
      await sendInfo("PATCH");
    } else {
      await sendInfo("POST");
    }
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
            <CloseText done={type === "ru"} onClick={() => nextLanguage("ru")}>
              {type === "ru" ? <Done /> : <InProgress />}
              Русский
            </CloseText>
            <ProgressionDash />
            <CloseText done={type === "en"} onClick={() => nextLanguage("en")}>
              {type === "en" ? <Done /> : <InProgress />}
              English
            </CloseText>
            <ProgressionDash />
            <CloseText done={type === "uz"} onClick={() => nextLanguage("uz")}>
              {type === "uz" ? <Done /> : <InProgress />}
              Uzbek
            </CloseText>
          </Progression>
          <span>Заголовок</span>
          <StyledTextArea
            value={inputTitle}
            onChange={(e) => setInputTitle(e.target.value)}
            placeholder="Введите заголовок"
          />
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
              <StyledTextArea
                value={inputPrice?.price}
                onChange={(e) => setInputPrice({ price: e.target.value })}
                placeholder="Введите цену"
              />
            </>
          )}
          {showDestination && (
            <>
              <span>Направление</span>
              <WarningText>*e.g.: Из Ташкента и обратно</WarningText>
              <StyledTextArea
                placeholder="Введите направление"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
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
          <StyledButton onClick={() => setOpenDropzone(true)}>
            Загрузить файл обложки или иконку
          </StyledButton>
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
