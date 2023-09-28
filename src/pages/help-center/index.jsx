import React, { useEffect, useState } from "react";
import { SideMenu } from "./sideMenu";
import { LanguageChange } from "../../components/changeLanguage";
import { MainWrapper } from "./styled";
import { StyledButton, StyledInput, StyledTextArea } from "../../shared_styled";
import { PRESSCENTER, SUPERADMIN } from "../../constants";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllInfo, getFaq, getUser } from "../../store";
import { fetchFaq } from "../../store/get-api-info";
import { sendFaq } from "../../store/send-api-info";
import { patchFaq } from "../../store/patch-api-info";
import {
  setFaqId,
  setNewFaqEnglish,
  setNewFaqRussian,
  setNewFaqUzbek,
} from "../../store/create-faq";

const CORRECT_ROLES = [SUPERADMIN, PRESSCENTER];

const HelpCenter = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { faq, faqFetched } = useSelector(getAllInfo);
  const selectorData = useSelector(getFaq);
  const [filteredFaq, setFilteredFaq] = useState(faq);
  const [search, setSearch] = useState("");
  const { role, login } = useSelector(getUser);
  const [language, setLanguage] = useState("ru");
  const [newTitle, setNewTitle] = useState({
    ru: "",
    en: "",
    uz: "",
  });
  const [newDescription, setNewDescription] = useState({
    ru: "",
    en: "",
    uz: "",
  });
  const [isNewFaq, setIsNewFaq] = useState(false);
  const nextLanguage = (newType, goNext) => {
    if (goNext) {
      if (language === "ru") setLanguage("en");
      else if (language === "en") setLanguage("uz");
      else if (language === "uz") setLanguage("ru");
    } else {
      setLanguage(newType);
    }
  };

  useEffect(() => {
    if (!CORRECT_ROLES.includes(role)) {
      navigate("/not-found");
    }
  }, [role, navigate]);

  useEffect(() => {
    if (role && login && !faqFetched) {
      dispatch(fetchFaq());
    }
    if (faq?.length !== 0) {
      dispatch(
        setNewFaqRussian({
          answer: faq[0].answer_ru,
          question: faq[0].question_ru,
        })
      );
      dispatch(
        setNewFaqEnglish({
          answer: faq[0].answer_en,
          question: faq[0].question_en,
        })
      );

      dispatch(
        setNewFaqUzbek({
          answer: faq[0].answer_uz,
          question: faq[0].question_uz,
        })
      );
      dispatch(setFaqId({ id: faq[0].id }));
    }
  }, [dispatch, role, login, faqFetched]);

  useEffect(() => {
    if (filteredFaq?.length !== 0 && !isNewFaq) {
      setNewTitle({
        ru: selectorData?.question_ru,
        en: selectorData?.question_en,
        uz: selectorData?.question_uz,
      });
      setNewDescription({
        ru: selectorData?.answer_ru,
        en: selectorData?.answer_en,
        uz: selectorData?.answer_uz,
      });
    }
  }, [filteredFaq, isNewFaq, selectorData]);

  useEffect(() => {
    if (search) {
      const filtered = faq?.filter((item) =>
        item?.question_ru?.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredFaq(filtered);
    } else {
      setFilteredFaq(faq);
    }
  }, [search, faq]);
  const emptyFaq = {
    ru: "",
    en: "",
    uz: "",
  };
  const handleNewFaq = () => {
    setIsNewFaq(true);

    setNewTitle(emptyFaq);
    setNewDescription(emptyFaq);
  };

  const handleUpdateFaq = (info) => {
    setIsNewFaq(false);
    dispatch(
      setNewFaqRussian({
        answer: info?.answer_ru,
        question: info?.question_ru,
      })
    );
    dispatch(
      setNewFaqEnglish({
        answer: info?.answer_en,
        question: info?.question_en,
      })
    );
    dispatch(
      setNewFaqUzbek({
        answer: info?.answer_uz,
        question: info?.question_uz,
      })
    );
    info?.id && dispatch(setFaqId({ id: info?.id }));
  };

  const handleSave = () => {
    if (!isNewFaq) {
      dispatch(
        patchFaq({
          question: newTitle,
          answer: newDescription,
        })
      );
      handleUpdateFaq({
        answer_en: newDescription.en,
        answer_ru: newDescription.ru,
        answer_uz: newDescription.uz,
        question_en: newTitle.en,
        question_ru: newTitle.ru,
        question_uz: newTitle.uz,
      });
    } else {
      dispatch(sendFaq({ question: newTitle, answer: newDescription }));
      setNewTitle(emptyFaq);
      setNewDescription(emptyFaq);
    }
  };
  return (
    <>
      <SideMenu
        handleUpdateFaq={handleUpdateFaq}
        handleNewFaq={handleNewFaq}
        faq={filteredFaq}
        setSearch={setSearch}
        search={search}
      />
      <MainWrapper>
        <LanguageChange
          nextButton
          language={language}
          changeLang={nextLanguage}
        />
        <StyledInput
          value={newTitle[language]}
          onChange={(e) =>
            setNewTitle({ ...newTitle, [language]: e.target.value })
          }
          placeholder="Текст вопроса"
          bc="#FFF"
        />
        <StyledTextArea
          placeholder="Ответ на вопрос"
          bc="#FFF"
          height="400px"
          value={newDescription[language]}
          onChange={(e) =>
            setNewDescription({ ...newDescription, [language]: e.target.value })
          }
        />
        <StyledButton onClick={handleSave}>Опубликовать вопрос</StyledButton>
      </MainWrapper>
    </>
  );
};

export default HelpCenter;
