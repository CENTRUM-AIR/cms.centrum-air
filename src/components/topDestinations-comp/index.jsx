import React, { useEffect, useState } from "react";
import {
  Destination,
  EmptyHolder,
  Image,
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
import { formDataApi } from "../../utils/api";
import { deleteTopDestination } from "../../store/create-top-destinations/delete";
import { getFaq } from "../../store";
import { useGetInfo } from "../../hooks/use-get-info";
import { fetchFaq } from "../../store/create-faq/fetch";
import { patchFaq } from "../../store/create-faq/patch";
import { sendFaq } from "../../store/create-faq/post";
import { deleteFaq } from "../../store/create-faq/delete";
export const TopDestinationComp = ({ item }) => {
  const dataFaq = useSelector(getFaq);
  useGetInfo({ selector: getFaq, fetcher: fetchFaq });
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const handleClick = (e) => setOpenModal(!openModal);

  const [openFaqModal, setOpenFaqModal] = useState(false);
  const handleFaqClick = (e) => setOpenFaqModal(!openFaqModal);
  const [FaqList, setFaqList] = useState(null);
  const [code, setCode] = useState(item?.code || "");

  const [question, setQuestion] = useState({
    ru: FaqList?.question_ru || "",
    en: FaqList?.question_en || "",
    uz: FaqList?.question_uz || "",
  });
  const [answer, setAnswer] = useState({
    ru: FaqList?.answer_ru || "",
    en: FaqList?.answer_en || "",
    uz: FaqList?.answer_uz || "",
  });

  const [title, setTitle] = useState({
    uz: item?.title_uz || "",
    ru: item?.title_ru || "",
    en: item?.title_en || "",
  });
  const [departures, setDepartures] = useState(item?.departures || "");
  const [subDscription, setSubDscription] = useState({
    uz: item?.sub_description_uz || "",
    ru: item?.sub_description_ru || "",
    en: item?.sub_description_en || "",
  });
  const [dscription, setDscription] = useState({
    uz: item?.description_uz || "",
    ru: item?.description_ru || "",
    en: item?.description_en || "",
  });
  const [lng, setLng] = useState(item?.lng || "");
  const [lat, setLat] = useState(item?.lat || "");
  const [photo, setPhoto] = useState("");
  const [photoUrl, setPhotoUrl] = useState(item?.photo_url || "");

  const [entityId, setEntityId] = useState(item?.id || 0);

  const [entity, setEntity] = useState(FaqList?.entity || "topdestinations");

  const handleFaqPublish = async () => {
    if (
      areAllKeysNotEmpty(question) &&
      areAllKeysNotEmpty(answer) &&
      entity &&
      entityId
    ) {
      if (FaqList) {
        dispatch(
          patchFaq({
            question,
            answer,
            id: FaqList.id,
            entityId: item.id,
            entity,
          })
        );
      } else {
        dispatch(
          sendFaq({
            question,
            answer,
            entityId,
            entity,
          })
        );
      }
      setOpenFaqModal(false);
    }
  };

  const handlePublish = () => {
    if (
      areAllKeysNotEmpty(title) &&
      areAllKeysNotEmpty(subDscription) &&
      areAllKeysNotEmpty(dscription) &&
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
            subDscription,
            dscription,
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
            subDscription,
            dscription,
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
    dispatch(deleteFaq({ id: FaqList?.id }));
    setOpenFaqModal(false);
  };

  return (
    <>
      <Wrapper onClick={handleClick}>
        {item ? (
          <>
            <Image src={item?.photo_url} />
            <TextHolder>
              <Text>{item?.title_ru}</Text>
              <Destination>
                <Plane />
                {item?.destination_ru}
              </Destination>
            </TextHolder>
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
          titleText="Актуальные направления"
          item={{
            title,
            subDscription,
            smallDescription: dscription,
            lat,
            lng,
            code,
            departures,
            isTitleInput: true,
            isDescEditor: true,
          }}
          canBePublished={
            areAllKeysNotEmpty(title) &&
            areAllKeysNotEmpty(subDscription) &&
            areAllKeysNotEmpty(dscription) &&
            lat &&
            lng &&
            code &&
            departures
          }
          setImage={setPhoto}
          setDescription={setDscription}
          setSubDescription={setSubDscription}
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
          isFAQ={setOpenFaqModal}
          setFaqList={setFaqList}
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
          isNew={!FaqList}
          isPhoto={false}
          setQuestion={setQuestion}
          setAnswer={setAnswer}
        />
      )}
    </>
  );
};
