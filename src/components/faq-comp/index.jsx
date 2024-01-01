import React, { useState } from "react";
import { EmptyHolder, Title, Wrapper } from "./styled";
import { ReactComponent as PLusSign } from "../../icons/plus-sign.svg";
import { useDispatch } from "react-redux";
import { areAllKeysNotEmpty } from "../../utils/obj-not-empty";
import { patchFaq } from "../../store/create-faq/patch";
import { sendFaq } from "../../store/create-faq/post";
import { deleteFaq } from "../../store/create-faq/delete";
import Design from "../creation/design";

export const FaqComp = ({ item }) => {
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [question, setQuestion] = useState({
    ru: item?.question_ru || "",
    en: item?.question_en || "",
    uz: item?.question_uz || "",
  });
  const [answer, setAnswer] = useState({
    ru: item?.answer_ru || "",
    en: item?.answer_en || "",
    uz: item?.answer_uz || "",
  });
  const handleClick = (e) => setOpenModal(!openModal);

  const handlePublish = () => {
    if (areAllKeysNotEmpty(question) && areAllKeysNotEmpty(answer)) {
      if (item) {
        dispatch(
          patchFaq({
            question,
            answer,
            id: item?.id,
          })
        );
      } else {
        dispatch(
          sendFaq({
            question,
            answer,
          })
        );
      }
    }
    setOpenModal(false);
  };
  const handleDelete = () => {
    dispatch(deleteFaq({ id: item?.id }));
    setOpenModal(false);
  };
  return (
    <>
      <Wrapper onClick={handleClick}>
        {item ? (
          <>
            <Title>{item?.question_ru}</Title>
            <p>{item?.answer_ru}</p>
          </>
        ) : (
          <EmptyHolder>
            <p>Добавить новое</p>
            <PLusSign />
          </EmptyHolder>
        )}
      </Wrapper>
      {openModal && (
        <Design
          titleText="Q&A Component"
          item={{ question, answer }}
          canBePublished={
            areAllKeysNotEmpty(question) && areAllKeysNotEmpty(question)
          }
          onClose={handleClick}
          handlePublish={handlePublish}
          onDelete={handleDelete}
          isNew={!item}
          isPhoto={false}
          setQuestion={setQuestion}
          setAnswer={setAnswer}
        />
      )}
    </>
  );
};
