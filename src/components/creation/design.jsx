import React, { useState } from "react";
import {
  ButtonHolder,
  CloseText,
  FileHolder,
  FileName,
  MainTitle,
  MainWrapper,
  ModalBackdrop,
  PdfFileHolder,
  WarningText,
  Wrapper,
} from "./styled";
import { ReactComponent as CloseIcon } from "../../icons/close.svg";
import { ReactComponent as PLusSign } from "../../icons/plus-sign.svg";
import { ReactComponent as EditIcon } from "../../icons/edit.svg";
import { ReactComponent as PdfIcon } from "../../icons/pdf.svg";
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
import { FaqComp } from "../faq-comp";
import { Modal } from "../Modal";
import { useDispatch, useSelector } from "react-redux";
import { deleteFaq } from "../../store/create-faq/delete";
import api from "../../utils/api";
import { getFaq, getTopDestinations } from "../../store";
import { useGetInfo } from "../../hooks/use-get-info";
import { fetchFaq } from "../../store/create-faq/fetch";
import { FaQ } from "react-icons/fa6";

const Design = ({
  titleText,
  setText,
  item,
  isNew,
  onClose,
  image,
  onDelete,
  onDeleteFaq,
  setImage,
  uploadPhoto,
  canBePublished,
  handlePublish,
  setFrom,
  setLat,
  setLng,
  setCode,
  departures,
  setDepartures,
  setTo,
  setPhoneNumber,
  isPhoto = true,
  isFAQ,
  setOpenFaqModal,
  setUserInfo,
  setCity,
  setCountry,
  setCityCode,
  setIsSearch,
  setSmallDescription,
  setSubDescription,
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
  FaqList,
  setFaqList,
  setCurrentFaq,
  file,
  setFile,
  setSetting,
  setKey,
  setValue,
}) => {
  const [openDropzone, setOpenDropzone] = useState(false);
  const [openFaq, setOpenFaq] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [isDeleteFaq, setIsDeleteFaq] = useState(false);

  useGetInfo({ selector: getFaq, fetcher: fetchFaq });

  const isSvg = () => {
    if (typeof image === "string") return image?.includes("svg") ? true : false;
    return false;
  };
  const dispatch = useDispatch();

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
          {!setUserInfo && !setSetting && (
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
          {uploadPhoto && (
            <StyledButton onClick={() => isFAQ(true)}>
              upload photo
            </StyledButton>
          )}

          {setDepartures && (
            <>
              <span>departures</span>
              <StyledInput
                value={item?.departures}
                onChange={(e) => setDepartures(e.target.value)}
                placeholder="departures"
              />
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
          {setLat && (
            <>
              <span>lat</span>
              <StyledInput
                value={item?.lat}
                onChange={(e) => setLat(e.target.value)}
                placeholder="Введите цену"
              />
            </>
          )}
          {setLng && (
            <>
              <span>lng</span>
              <StyledInput
                value={item?.lng}
                onChange={(e) => setLng(e.target.value)}
                placeholder="Введите цену"
              />
            </>
          )}
          {setCode && (
            <>
              <span>code</span>
              <StyledInput
                value={item?.code}
                onChange={(e) => setCode(e.target.value)}
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

          {setSetting && (
            <>
              <span>Пароль</span>
              <StyledInput
                value={item?.key}
                placeholder="Введите новый Пароль"
                onChange={(e) => setKey(e.target.value)}
              />
            </>
          )}
          {setSetting && (
            <>
              <span>Cодержание</span>

              <TextEditor
                changeStatus={language}
                placeholder="Введите содержение"
                value={item?.value}
                onChange={(e) => setValue((prev) => e)}
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
          {setIsSearch && (
            <>
              <span>Явлется полетом Centrum-air?</span>
              <Select
                text="Полет"
                selectedValue={
                  item?.isSearch
                    ? { label: "Да", value: true }
                    : { label: "Нет", value: false }
                }
                onPick={(e) => setIsSearch(e?.value)}
                placeholder="Выберите"
                items={[
                  { label: "Да", value: true },
                  { label: "Нет", value: false },
                ]}
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
          {setSubDescription && (
            <>
              <span>sub Description</span>
              {item?.isDescEditor ? (
                <TextEditor
                  changeStatus={language}
                  placeholder="Введите содержение"
                  value={item?.subDescription?.[language]}
                  onChange={(e) =>
                    setSubDescription((prev) => ({
                      ...prev,
                      [language]: e,
                    }))
                  }
                />
              ) : (
                <StyledTextArea
                  value={item?.subDescription?.[language]}
                  placeholder="Введите содержение"
                  onChange={(e) =>
                    setSubDescription((prev) => ({
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
          {setFile && (
            <>
              {file && (
                <PdfFileHolder href={file?.preview || file} target="_blank">
                  <PdfIcon height="60px" width="60px" />
                  <FileName>{file?.name}</FileName>
                  <p>Кликните, чтобы скачать</p>
                </PdfFileHolder>
              )}
              <FileHolder onClick={() => setOpenDropzone(true)}>
                Добавить файл
              </FileHolder>
            </>
          )}

          {setOpenFaqModal && !isNew && (
            <div>
              <div>
                {FaqList?.length > 0 &&
                  FaqList?.map((faq, index) => {
                    return (
                      <div key={index}>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-around",
                            border: "1px solid #174abc",
                            marginBottom: "7px",
                            borderRadius: "12px",
                            padding: "4px",
                            background: "#f3f6fc",
                            alignItems: "center",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              width: "70%",
                            }}
                          >
                            <p style={{ marginBottom: "10px" }}>{faq?.id}</p>
                            <p>title_{faq.question_ru}</p>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              width: "10%",
                              justifyContent: "space-between",
                            }}
                          >
                            <div
                              onClick={() => {
                                setCurrentFaq(faq);
                                setOpenFaqModal(true);
                              }}
                            >
                              <EditIcon />
                            </div>
                            <div
                              onClick={() => {
                                setIsDeleteFaq(true);
                              }}
                            >
                              <CloseIcon />
                            </div>
                          </div>
                        </div>
                        {isDeleteFaq && (
                          <DeletionModal
                            handleDelete={() => {
                              dispatch(deleteFaq({ id: faq.id }));
                              setFaqList(
                                FaqList.filter((item) => item.id !== faq.id)
                              );
                              setIsDeleteFaq(false);
                            }}
                            removeDelete={() => setIsDeleteFaq(false)}
                          />
                        )}
                      </div>
                    );
                  })}
              </div>
              <StyledButton
                secondary="true"
                onClick={() => {
                  setOpenFaqModal(true);
                  setCurrentFaq(null);
                }}
              >
                <PLusSign /> New Faq
              </StyledButton>
            </div>
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
          setImage={setImage || setFile}
          isPdf={!!setFile}
          onClose={() => setOpenDropzone(false)}
        />
      )}
      {openFaq && (
        <Modal>
          <p style={{ marginBottom: "10px" }}>add FAQ</p>
          <FaqComp />
        </Modal>
      )}
    </>
  );
};

export default Design;
