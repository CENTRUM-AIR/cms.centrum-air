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
import { getServices, getDestinations, getMainPage } from "../../store";
import { useSelector } from "react-redux";
import { Modal } from "../Modal";
import { setServiceIcon } from "../../store/create-additional-service";
import { SERVER } from "../../constants";
import { usePublishInfo } from "../../utils/create-correct-data";
import api from "../../utils/api";

export const Creation = ({
  title,
  actionType,
  onClose,
  isTextArea,
  smallDesc,
  setEnglish,
  setRussian,
  setUzbek,
  setFile,
  isEdition,
  id,
  showPrice,
  showDestination,
  setPrice,
  fileType,
}) => {
  const {
    title_uz: title_uz_service,
    title_ru: title_ru_service,
    title_en: title_en_service,
    description_uz: description_uz_service,
    description_ru: description_ru_service,
    description_en: description_en_service,
    small_description_uz: small_description_uz_service,
    small_description_ru: small_description_ru_service,
    small_description_en: small_description_en_service,
    icon: icon_service,
  } = useSelector(getServices);
  const {
    title_uz: title_uz_dest,
    title_ru: title_ru_dest,
    title_en: title_en_dest,
    description_uz: description_uz_dest,
    description_ru: description_ru_dest,
    description_en: description_en_dest,
    destination_uz,
    destination_ru,
    destination_en,
    price: price_dest,
    photo: photo_dest,
  } = useSelector(getDestinations);
  const {
    title_uz: title_uz_main,
    title_ru: title_ru_main,
    title_en: title_en_main,
    photo,
  } = useSelector(getMainPage);

  const [icon, setIcon] = useState("");
  const [type, setType] = useState("ru");
  const [inputTitle, setInputTitle] = useState("");
  const [description, setDescription] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [image, setImage] = useState("");
  const [inputPrice, setInputPrice] = useState("");
  const [destination, setDestination] = useState("");
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

  const sendInfo = async (formData, method, isObj) => {
    const reqInside = () => {
      if (isObj) {
        return {
          method: method,
          body: JSON.stringify(formData),
          headers: {
            "Content-Type": "application/json",
          },
        };
      }
      return {
        method: method,
        body: formData,
      };
    };

    await fetch(`${SERVER}/${actionType}`, reqInside())
      .then((res) => {
        if (res.status === 500) {
          setError("Ошибка сервера");
        } else if (res.status === 400) {
          setError("Ошибка валидации. \nПроверьте пустые поля");
        } else if (res.status === 200 || 201) {
          onClose();
          // window.location.reload();
        }
      })
      .catch((err) => {
        setError(err);
        console.log("err", err);
      });
  };
  const requestBody = usePublishInfo({
    actionType,
    inputTitle,
    description,
    destination,
    shortDescription,
    image,
    inputPrice,
    type,
    icon,
  });

  const publishInfo = async () => {
    collectData();
    console.log(requestBody);
    // if (isEdition) {
    //   await sendInfo(JSON.stringify(requestBody), "PATCH", true);
    // } else {
    //   await sendInfo(JSON.stringify(requestBody), "POST", true);
    // }
  };

  useEffect(() => {
    if (actionType === "mainpage") {
      if (type === "ru") {
        setInputTitle(title_ru_main);
      }
      if (type === "en") {
        setInputTitle(title_en_main);
      }
      if (type === "uz") {
        setInputTitle(title_uz_main);
      }
      setImage(photo);
    }
  }, [actionType, title_en_main, title_ru_main, title_uz_main, photo, type]);

  useEffect(() => {
    if (actionType === "offers") {
      if (type === "ru") {
        setInputTitle(title_ru_dest);
        setDescription(description_ru_dest);
        setDestination(destination_ru);
      } else if (type === "en") {
        setInputTitle(title_en_dest);
        setDescription(description_en_dest);
        setDestination(destination_en);
      } else if (type === "uz") {
        setInputTitle(title_uz_dest);
        setDescription(description_uz_dest);
        setDestination(destination_uz);
      }
      setInputPrice(price_dest);
      setImage(photo_dest);
    }
  }, [
    actionType,
    title_en_dest,
    title_ru_dest,
    title_uz_dest,
    photo,
    type,
    description_ru_dest,
    description_en_dest,
    description_uz_dest,
    destination_ru,
    destination_en,
    destination_uz,
    price_dest,
    photo_dest,
  ]);
  useEffect(() => {
    if (actionType === "services") {
      if (type === "ru") {
        setInputTitle(title_ru_service);
        setDescription(description_ru_service);
        setShortDescription(small_description_ru_service);
      } else if (type === "en") {
        setInputTitle(title_en_service);
        setDescription(description_en_service);
        setShortDescription(small_description_en_service);
      } else if (type === "uz") {
        setInputTitle(title_uz_service);
        setDescription(description_uz_service);
        setShortDescription(small_description_uz_service);
      }
      setServiceIcon(icon_service);
    }
  }, [
    actionType,
    title_en_service,
    title_ru_service,
    title_uz_service,
    photo,
    type,
    description_ru_service,
    description_en_service,
    description_uz_service,
    small_description_ru_service,
    small_description_en_service,
    small_description_uz_service,
    icon_service,
  ]);

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
          {showPrice && (
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
            <>
              <span>Направление</span>
              <WarningText>*e.g.: Из Ташкента и обратно</WarningText>
              <StyledInput
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
              <img
                width="200px"
                src={image?.photo?.preview || image?.photo}
                alt="expected"
              />
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
          setIcon={setIcon}
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
