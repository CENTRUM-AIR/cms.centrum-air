import React, { useState } from "react";
import { EmptyHolder, Title, Wrapper } from "./styled";
import { ReactComponent as PlusSign } from "../../icons/plus-sign.svg";
import { useDispatch } from "react-redux";
import { areAllKeysNotEmpty } from "../../utils/obj-not-empty";
import Design from "../creation/design";
import { patchSetting } from "../../store/create-setting/patch";
import { sendSetting } from "../../store/create-setting/post";
import { deleteSetting } from "../../store/create-setting/delete";
export const SettingComp = ({ item }) => {
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const handleClick = (e) => setOpenModal(!openModal);

  const [key, setKey] = useState({
    ru: item?.key_ru || "",
    en: item?.key_en || "",
    uz: item?.key_uz || "",
  });
  const [value, setValue] = useState({
    ru: item?.value_ru || "",
    en: item?.value_en || "",
    uz: item?.value_uz || "",
  });

  // const patchSingleFaq = async () => {
  //   const requestBody = {};
  //   const patchData = {};
  //   LANGUAGES.forEach((lang) => {
  //     requestBody[`question_${lang}`] = question[lang];
  //     patchData[`question_${lang}`] = question[lang];
  //     requestBody[`answer_${lang}`] = answer[lang];
  //     patchData[`answer_${lang}`] = answer[lang];
  //   });
  //   const response = await api
  //     .patch(`/faq/${currentFaq.id}`, requestBody)
  //     .catch((e) => {
  //       throw new Error(e);
  //     });

  //   if (response.status == 200 || response.status == 201) {
  //     const FindIndex = FaqList.indexOf(currentFaq);
  //     const faqs = [...FaqList];
  //     faqs[FindIndex] = requestBody;
  //     setFaqList(faqs);
  //   }
  // };

  // const sendSingleFaq = async () => {
  //   const requestBody = {};
  //   const patchData = {};
  //   LANGUAGES.forEach((lang) => {
  //     requestBody[`question_${lang}`] = question[lang];
  //     patchData[`question_${lang}`] = question[lang];
  //     requestBody[`answer_${lang}`] = answer[lang];
  //     patchData[`answer_${lang}`] = answer[lang];
  //     requestBody[`entity`] = entity;
  //     patchData[`entity`] = entity;
  //     requestBody[`entity_id`] = parseInt(entityId);
  //     patchData[`entity_id`] = parseInt(entityId);
  //   });
  //   const response = await api.post("/faq", requestBody).catch((e) => {
  //     throw new Error(e);
  //   });
  //   setFaqList((prev) => [...prev, response.data]);
  // };
  // const handleFaqPublish = async () => {
  //   if (
  //     areAllKeysNotEmpty(question) &&
  //     areAllKeysNotEmpty(answer)

  //   ) {
  //     if (currentFaq) {
  //       patchSingleFaq();
  //     } else {
  //       sendSingleFaq();
  //     }
  //     setOpenFaqModal(false);
  //   }
  // };

  // const fetchSingleTopdestinations = async () => {
  //   const response = await api.get(`/topdestinations/${code}`).catch((e) => {
  //     throw new Error(e);
  //   });

  //   // setFaqList(response.data.faqs);
  // };

  // useEffect(() => {
  //   openModal  && fetchSingleTopdestinations();
  // }, [openModal]);

  const handlePublish = () => {
    if (areAllKeysNotEmpty(key) && areAllKeysNotEmpty(value)) {
      if (item) {
        dispatch(
          patchSetting({
            key,
            value,
            id: item?.id,
          })
        );
      } else {
        dispatch(
          sendSetting({
            key,
            value,
          })
        );
      }
    }
    setOpenModal(false);
  };

  // useEffect(() => {
  //   if (!photo) return;
  //   const formDataDest = new FormData();
  //   photo?.preview && formDataDest.append("file", photo);
  //   formDataApi
  //     .post("/topdestinations/photo", formDataDest)
  //     .then((res) => setPhotoUrl(res.data.data.url))
  //     .catch((e) => {
  //       throw new Error(e);
  //     });
  // }, [photo]);

  const handleDelete = () => {
    dispatch(deleteSetting({ id: item?.id }));
    setOpenModal(false);
  };

  // const handleFaqDelete = () => {
  //   // TODO
  //   dispatch(deleteFaq({ id: currentFaq?.id }));
  //   setFaqList(FaqList.filter((item) => item.id !== currentFaq.id));
  //   setOpenFaqModal(false);
  // };

  return (
    <>
      <Wrapper onClick={handleClick}>
        {item ? (
          <>
            <Title>{item?.question_ru}</Title>
            <p dangerouslySetInnerHTML={{ __html: item?.answer_ru }} />
          </>
        ) : (
          <EmptyHolder>
            <p>Добавить новое</p>
            <PlusSign />
          </EmptyHolder>
        )}
      </Wrapper>
      {openModal && (
        <Design
          titleText="Setting component"
          item={{ key, value }}
          canBePublished={areAllKeysNotEmpty(key) && areAllKeysNotEmpty(value)}
          onClose={handleClick}
          setText={setKey}
          setDescription={setValue}
          handlePublish={handlePublish}
          onDelete={handleDelete}
          isNew={!item}
          shortDescTitle="Направление"
        />
      )}
    </>
  );
};
