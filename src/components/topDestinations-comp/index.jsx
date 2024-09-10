import React, { useEffect, useState } from "react";
import {
  Destination,
  EmptyHolder,
  Image,
  RowCheckBox,
  RowDetail,
  Text,
  TextHolder,
  Wrapper,
} from "./styled";
import { ReactComponent as Plane } from "../../icons/plane.svg";
import { ReactComponent as PlusSign } from "../../icons/plus-sign.svg";
import { useDispatch, useSelector } from "react-redux";
import { areAllKeysNotEmpty } from "../../utils/obj-not-empty";
import Design from "../creation/design";
import { patchTopDestinations } from "../../store/create-top-destinations/patch";
import { sendTopDestination } from "../../store/create-top-destinations/post";
import api, { formDataApi } from "../../utils/api";
import { deleteTopDestination } from "../../store/create-top-destinations/delete";
import { getFaq } from "../../store";
import { useGetInfo } from "../../hooks/use-get-info";
import { fetchFaq } from "../../store/create-faq/fetch";
import { patchFaq } from "../../store/create-faq/patch";
import { sendFaq } from "../../store/create-faq/post";
import { deleteFaq } from "../../store/create-faq/delete";
import { LANGUAGES } from "../../store/create-main-page/patch";
export const TopDestinationComp = ({ item }) => {
  useGetInfo({ selector: getFaq, fetcher: fetchFaq });
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const handleClick = (e) => setOpenModal(!openModal);

  const [openFaqModal, setOpenFaqModal] = useState(false);
  const handleFaqClick = (e) => setOpenFaqModal(!openFaqModal);
  const [FaqList, setFaqList] = useState(null);
  const [currentFaq, setCurrentFaq] = useState(null);
  const [code, setCode] = useState(item?.code || "");

  const [question, setQuestion] = useState({
    ru: "",
    en: "",
    uz: "",
  });
  const [answer, setAnswer] = useState({
    ru: "",
    en: "",
    uz: "",
  });

  const [title, setTitle] = useState({
    uz: item?.title_uz || "",
    ru: item?.title_ru || "",
    en: item?.title_en || "",
  });
  const [departures, setDepartures] = useState(item?.departures || "");
  const [subDescription, setSubDescription] = useState({
    uz: item?.sub_description_uz || "",
    ru: item?.sub_description_ru || "",
    en: item?.sub_description_en || "",
  });
  const [description, setDescription] = useState({
    uz: item?.description_uz || "",
    ru: item?.description_ru || "",
    en: item?.description_en || "",
  });
  const [lng, setLng] = useState(item?.lng || "");
  const [lat, setLat] = useState(item?.lat || "");
  const [photo, setPhoto] = useState("");
  const [photoUrl, setPhotoUrl] = useState(item?.photo_url || "");

  const [entityId, setEntityId] = useState(item?.id || 0);

  const [entity, setEntity] = useState("topdestinations");
  const [checked, setChecked] = useState(item?.status === "ACTIVE");
  const handleChange = async (e) => {
    setChecked(e.target.checked);

    const response = await api
      .patch(`/topdestinations/${item?.id}/status`, {
        status: e.target.checked ? "ACTIVE" : "DEACTIVE",
      })
      .catch((e) => {
        throw new Error(e);
      });

    if (response.status == 200 || response.status == 201) {
      setChecked(e.target.checked);
    } else {
      setChecked(!e.target.checked);
    }
  };
  const patchSingleFaq = async () => {
    const requestBody = {};
    const patchData = {};
    LANGUAGES.forEach((lang) => {
      requestBody[`question_${lang}`] = question[lang];
      patchData[`question_${lang}`] = question[lang];
      requestBody[`answer_${lang}`] = answer[lang];
      patchData[`answer_${lang}`] = answer[lang];
      requestBody[`entity`] = entity;
      patchData[`entity`] = entity;
      requestBody[`entity_id`] = parseInt(entityId);
      patchData[`entity_id`] = parseInt(entityId);
    });
    const response = await api
      .patch(`/faq/${currentFaq.id}`, requestBody)
      .catch((e) => {
        throw new Error(e);
      });

    if (response.status == 200 || response.status == 201) {
      const FindIndex = FaqList.indexOf(currentFaq);
      const faqs = [...FaqList];
      faqs[FindIndex] = requestBody;
      setFaqList(faqs);
    }
  };

  const sendSingleFaq = async () => {
    const requestBody = {};
    const patchData = {};
    LANGUAGES.forEach((lang) => {
      requestBody[`question_${lang}`] = question[lang];
      patchData[`question_${lang}`] = question[lang];
      requestBody[`answer_${lang}`] = answer[lang];
      patchData[`answer_${lang}`] = answer[lang];
      requestBody[`entity`] = entity;
      patchData[`entity`] = entity;
      requestBody[`entity_id`] = parseInt(entityId);
      patchData[`entity_id`] = parseInt(entityId);
    });
    const response = await api.post("/faq", requestBody).catch((e) => {
      throw new Error(e);
    });
    setFaqList((prev) => [...prev, response.data]);
  };
  const handleFaqPublish = async () => {
    if (
      areAllKeysNotEmpty(question) &&
      areAllKeysNotEmpty(answer) &&
      entity &&
      entityId
    ) {
      if (currentFaq) {
        patchSingleFaq();
      } else {
        sendSingleFaq();
      }
      setOpenFaqModal(false);
    }
  };

  const fetchSingleTopdestinations = async () => {
    const response = await api.get(`/topdestinations/${code}`).catch((e) => {
      throw new Error(e);
    });

    setFaqList(response.data.faqs);
  };

  useEffect(() => {
    openModal && code && fetchSingleTopdestinations();
  }, [openModal]);

  const handlePublish = () => {
    if (
      areAllKeysNotEmpty(title) &&
      areAllKeysNotEmpty(subDescription) &&
      areAllKeysNotEmpty(description) &&
      lat &&
      lng &&
      code &&
      departures &&
      photoUrl
    ) {
      if (item) {
        dispatch(
          patchTopDestinations({
            title,
            subDescription,
            description,
            lat,
            lng,
            code,
            photoUrl,
            departures,
            id: item?.id,
          })
        );
      } else {
        dispatch(
          sendTopDestination({
            title,
            subDescription,
            description,
            lat,
            lng,
            code,
            answer,
            question,
            departures,
            photoUrl,
          })
        );
      }
    }
    setOpenModal(false);
  };

  useEffect(() => {
    if (!photo) return;
    const formDataDest = new FormData();
    photo?.preview && formDataDest.append("file", photo);
    formDataApi
      .post("/topdestinations/photo", formDataDest)
      .then((res) => setPhotoUrl(res.data.data.url))
      .catch((e) => {
        throw new Error(e);
      });
  }, [photo]);

  const handleDelete = () => {
    dispatch(deleteTopDestination({ id: item?.id }));
    setOpenModal(false);
  };

  const handleFaqDelete = () => {
    // TODO
    dispatch(deleteFaq({ id: currentFaq?.id }));
    setFaqList(FaqList.filter((item) => item.id !== currentFaq.id));
    setOpenFaqModal(false);
  };

  return (
    <>
      <>
        {item ? (
          <>
            <Wrapper>
              <RowDetail onClick={handleClick}>
                <Image src={item?.photo_url} />
                <TextHolder>
                  <Text>{item?.title_ru}</Text>
                  <Destination>
                    <Plane />
                    {item?.destination_ru}
                  </Destination>
                </TextHolder>
              </RowDetail>
              <RowCheckBox>
                <label>
                  <input
                    checked={checked}
                    type="checkbox"
                    onChange={handleChange}
                  />
                  Active Status
                </label>
              </RowCheckBox>
            </Wrapper>
          </>
        ) : (
          <Wrapper onClick={handleClick}>
            <EmptyHolder>
              <p>Добавить новое</p>
              <PlusSign />
            </EmptyHolder>
          </Wrapper>
        )}
      </>
      {openModal && (
        <Design
          titleText="Актуальные направления"
          item={{
            title,
            subDescription,
            description,
            lat,
            lng,
            code,
            departures,
            isTitleInput: true,
            isDescEditor: true,
            id: item?.id,
          }}
          canBePublished={
            areAllKeysNotEmpty(title) &&
            areAllKeysNotEmpty(subDescription) &&
            areAllKeysNotEmpty(description) &&
            lat &&
            lng &&
            code &&
            departures
          }
          setImage={setPhoto}
          setDescription={setDescription}
          setSubDescription={setSubDescription}
          onClose={handleClick}
          setText={setTitle}
          setLat={setLat}
          setLng={setLng}
          setCode={setCode}
          setDepartures={setDepartures}
          handlePublish={handlePublish}
          onDelete={handleDelete}
          isNew={!item}
          image={photo}
          setOpenFaqModal={setOpenFaqModal}
          openFaqModal={openFaqModal}
          setCurrentFaq={(faq) => {
            setCurrentFaq(faq);
            setAnswer({
              ru: faq?.answer_ru || "",
              en: faq?.answer_en || "",
              uz: faq?.answer_uz || "",
            });
            setQuestion({
              ru: faq?.question_ru || "",
              en: faq?.question_en || "",
              uz: faq?.question_uz || "",
            });
          }}
          setFaqList={setFaqList}
          FaqList={FaqList}
          shortDescTitle="Направление"
        />
      )}

      {openFaqModal && (
        <Design
          titleText="Q&A Component"
          item={{ question, answer }}
          canBePublished={
            areAllKeysNotEmpty(answer) && areAllKeysNotEmpty(question)
          }
          onClose={handleFaqClick}
          handlePublish={handleFaqPublish}
          onDelete={handleFaqDelete}
          isNew={!currentFaq}
          isPhoto={false}
          topdestinationId={item?.id}
          setQuestion={setQuestion}
          setAnswer={setAnswer}
        />
      )}
    </>
  );
};
