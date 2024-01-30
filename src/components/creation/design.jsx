import React, { useState } from "react";
import {
  ButtonHolder,
  CloseText,
  FileHolder,
  MainTitle,
  MainWrapper,
  ModalBackdrop,
  WarningText,
  Wrapper,
} from "./styled";
import { ReactComponent as CloseIcon } from "../../icons/close.svg";
import {
  StyledButton,
  StyledInput,
  StyledRedButton,
  StyledTextArea,
} from "../../shared_styled";
import { Dropzone } from "../dropzone";
import SVG from "react-inlinesvg";
import { LanguageChange } from "../changeLanguage";
import { DeletionModal } from "../deletionModal";
import { ROLES } from "../../constants";
import { Select } from "../select";
import { TextEditor } from "../textEditor";

const Design = ({
  titleText,
  setText,
  item,
  isNew,
  onClose,
  image,
  onDelete,
  setImage,
  canBePublished,
  handlePublish,
  setFrom,
  setTo,
  setPhoneNumber,
  isPhoto = true,
  setUserInfo,
  setCity,
  setCountry,
  setCityCode,
  setSmallDescription,
  setDescription,
  fileType,
  shortDescTitle,
  setPrice,
  setAnswer,
  setQuestion,
  setOrder,
  setMustKnow,
  setResponsibilities,
  setRequirements,
  setSkills,
}) => {
  const [openDropzone, setOpenDropzone] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const isSvg = () => {
    if (typeof image === "string") return image?.includes("svg") ? true : false;
    return false;
  };

  const [language, setLanguage] = useState("ru");
  const handleLanguageSwitch = (lang) => setLanguage(lang);
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
          {!setUserInfo && (
            <LanguageChange
              language={language}
              changeLang={handleLanguageSwitch}
            />
          )}
          {setText && (
            <>
              <span>{item?.mainText || "Заголовок"}</span>
              {item?.isTitleInput ? (
                <StyledInput
                  value={item?.title?.[language]}
                  onChange={(e) =>
                    setText((prev) => ({
                      ...prev,
                      [language]: e?.target?.value,
                    }))
                  }
                  placeholder={`Введите ${
                    item?.mainText?.toLowerCase() || "заголовок"
                  }`}
                />
              ) : (
                <TextEditor
                  changeStatus={language}
                  placeholder="Введите заголовок"
                  value={item?.title?.[language]}
                  onChange={(e) =>
                    setText((prev) => ({ ...prev, [language]: e }))
                  }
                />
              )}
            </>
          )}
          {setPrice && (
            <>
              <span>Цена</span>
              <StyledInput
                value={item?.price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Введите цену"
              />
            </>
          )}
          {setOrder && (
            <>
              <span>Номер Порядка</span>
              <StyledInput
                value={item?.order}
                onChange={(e) => setOrder(e.target.value)}
                placeholder="Введите номер порядка"
              />
            </>
          )}
          {setFrom && (
            <>
              <span>С Какого Города</span>
              <StyledInput
                value={item?.fromCity?.[language]}
                onChange={(e) =>
                  setFrom((prev) => ({ ...prev, [language]: e.target.value }))
                }
                placeholder="Введите имя Города"
              />
            </>
          )}
          {setTo && (
            <>
              <span>В Какой Город</span>
              <StyledInput
                value={item?.toCity?.[language]}
                onChange={(e) =>
                  setTo((prev) => ({ ...prev, [language]: e.target.value }))
                }
                placeholder="Введите имя Города"
              />
            </>
          )}
          {setUserInfo && (
            <>
              <span>Логин</span>
              <StyledInput
                value={item?.login}
                placeholder="Введите Логин"
                onChange={(e) =>
                  setUserInfo((prev) => ({ ...prev, login: e.target.value }))
                }
              />
            </>
          )}
          {setUserInfo && (
            <>
              <span>Пароль</span>
              <StyledInput
                value={item?.password}
                placeholder="Введите новый Пароль"
                onChange={(e) =>
                  setUserInfo((prev) => ({ ...prev, password: e.target.value }))
                }
              />
            </>
          )}
          {setUserInfo && (
            <>
              <span>Роль</span>
              <Select
                text="Роль"
                selectedValue={item?.role}
                onPick={(e) =>
                  setUserInfo((prev) => ({
                    ...prev,
                    role: e,
                  }))
                }
                placeholder="Выберите роль"
                items={ROLES}
              />
            </>
          )}
          {setPhoneNumber && (
            <>
              <span>Номер Телефона</span>
              <StyledInput
                value={item?.phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Введите номер телефона Города"
              />
            </>
          )}
          {setCity && (
            <>
              <span>Город</span>
              <StyledInput
                value={item?.city?.[language]}
                onChange={(e) =>
                  setCity((prev) => ({ ...prev, [language]: e.target.value }))
                }
                placeholder="Введите имя Города"
              />
            </>
          )}
          {setCountry && (
            <>
              <span>Страна</span>
              <StyledInput
                value={item?.country?.[language]}
                onChange={(e) =>
                  setCountry((prev) => ({
                    ...prev,
                    [language]: e.target.value,
                  }))
                }
                placeholder="Введите имя Страны"
              />
            </>
          )}
          {setCityCode && (
            <>
              <span>Код Города</span>
              <StyledInput
                value={item?.cityCode}
                onChange={(e) => setCityCode(e.target.value.toUpperCase())}
                placeholder="Введите код Города"
              />
            </>
          )}
          {setQuestion && (
            <>
              <span>Вопрос</span>
              <StyledInput
                value={item?.question?.[language]}
                onChange={(e) =>
                  setQuestion((prev) => ({
                    ...prev,
                    [language]: e.target.value,
                  }))
                }
                placeholder="Введите Вопрос"
              />
            </>
          )}
          {setAnswer && (
            <>
              <span>Ответ</span>
              <TextEditor
                changeStatus={language}
                placeholder="Введите Ответ"
                value={item?.answer?.[language]}
                onChange={(e) =>
                  setAnswer((prev) => ({
                    ...prev,
                    [language]: e,
                  }))
                }
              />
            </>
          )}
          {setSmallDescription && (
            <>
              <span>
                {shortDescTitle || item?.shortDesc || "Краткое описание"}
                {shortDescTitle && (
                  <WarningText>*e.g.: Из Ташкента и обратно</WarningText>
                )}
              </span>

              <StyledTextArea
                value={item?.smallDescription?.[language]}
                onChange={(e) =>
                  setSmallDescription((prev) => ({
                    ...prev,
                    [language]: e.target.value,
                  }))
                }
                placeholder={`Введите ${
                  shortDescTitle?.toLowerCase() ||
                  item?.shortDesc?.toLowerCase() ||
                  "краткое описание"
                }`}
              />
            </>
          )}
          {setDescription && (
            <>
              <span>Cодержание</span>
              {item?.isDescEditor ? (
                <TextEditor
                  changeStatus={language}
                  placeholder="Введите содержение"
                  value={item?.description?.[language]}
                  onChange={(e) =>
                    setDescription((prev) => ({
                      ...prev,
                      [language]: e,
                    }))
                  }
                />
              ) : (
                <StyledTextArea
                  value={item?.description?.[language]}
                  placeholder="Введите содержение"
                  onChange={(e) =>
                    setDescription((prev) => ({
                      ...prev,
                      [language]: e.target.value,
                    }))
                  }
                />
              )}
            </>
          )}
          {setMustKnow && (
            <>
              <span>Должен знать</span>
              <TextEditor
                changeStatus={language}
                value={item?.mustKnow?.[language]}
                onChange={(e) =>
                  setMustKnow((prev) => ({
                    ...prev,
                    [language]: e,
                  }))
                }
              />
            </>
          )}
          {setResponsibilities && (
            <>
              <span>Обязанности</span>
              <TextEditor
                changeStatus={language}
                value={item?.responsibilities?.[language]}
                onChange={(e) =>
                  setResponsibilities((prev) => ({
                    ...prev,
                    [language]: e,
                  }))
                }
              />
            </>
          )}
          {setRequirements && (
            <>
              <span>Требования</span>
              <TextEditor
                changeStatus={language}
                value={item?.requirements?.[language]}
                onChange={(e) =>
                  setRequirements((prev) => ({
                    ...prev,
                    [language]: e,
                  }))
                }
              />
            </>
          )}
          {setSkills && (
            <>
              <span>Ключевые навыки и качества</span>
              <TextEditor
                changeStatus={language}
                value={item?.skills?.[language]}
                onChange={(e) =>
                  setSkills((prev) => ({
                    ...prev,
                    [language]: e,
                  }))
                }
              />
            </>
          )}
          {isPhoto && (
            <>
              {image ? (
                <>
                  {isSvg() ? (
                    <SVG
                      onClick={() => setOpenDropzone(true)}
                      src={image?.preview || image}
                      width="200px"
                      height="100px"
                    />
                  ) : (
                    <img
                      onClick={() => setOpenDropzone(true)}
                      width="300px"
                      height="200px"
                      src={image?.preview || image}
                      alt="expected"
                    />
                  )}
                </>
              ) : (
                <FileHolder onClick={() => setOpenDropzone(true)}>
                  Добавить файл
                </FileHolder>
              )}
            </>
          )}
          <ButtonHolder>
            <StyledButton disabled={!canBePublished} onClick={handlePublish}>
              Опубликовать
            </StyledButton>
            <StyledButton
              onClick={() =>
                handleLanguageSwitch(
                  language === "ru" ? "en" : language === "en" ? "uz" : "ru"
                )
              }
            >
              Далее
            </StyledButton>
          </ButtonHolder>
          {!isNew && (
            <StyledRedButton onClick={() => setIsDelete(true)}>
              Удалить
            </StyledRedButton>
          )}
          {isDelete && (
            <DeletionModal
              handleDelete={onDelete}
              removeDelete={() => setIsDelete(false)}
            />
          )}
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
