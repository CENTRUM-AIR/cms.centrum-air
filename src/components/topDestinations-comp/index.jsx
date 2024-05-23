import React, { useState } from "react";
import {
  Destination,
  EmptyHolder,
  Image,
  Price,
  Text,
  TextHolder,
  Wrapper,
} from "./styled";
import { ReactComponent as Plane } from "../../icons/plane.svg";
import { ReactComponent as PlusSign } from "../../icons/plus-sign.svg";
import { useDispatch } from "react-redux";
import { areAllKeysNotEmpty } from "../../utils/obj-not-empty";
import { patchDestinations } from "../../store/create-destinations/patch";
import { sendDestination } from "../../store/create-destinations/post";
import { deleteDestination } from "../../store/create-destinations/delete";
import Design from "../creation/design";

export const TopDestinationComp = ({ item }) => {
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const handleClick = (e) => setOpenModal(!openModal);
  const [openFaqModal, setOpenFaqModal] = useState(false);
  const handleFaqClick = (e) => setOpenFaqModal(!openFaqModal);
  const [FaqList, setFaqList] = useState([]);
  const [code, setCode] = useState(item?.code || "");

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

  const [name, setName] = useState({
    uz: item?.name_uz || "",
    ru: item?.name_ru || "",
    en: item?.name_en || "",
  });
  // const [departures, setDepartures] = useState(item.departures || []);
  const [subDscription, setSubDscription] = useState({
    uz: item?.subDscription_uz || "",
    ru: item?.subDscription_ru || "",
    en: item?.subDscription_en || "",
  });
  const [dscription, setDscription] = useState({
    uz: item?.description_uz || "",
    ru: item?.description_ru || "",
    en: item?.description_en || "",
  });
  const [lng, setLng] = useState(item?.lng || "");
  const [lat, setLat] = useState(item?.lat || "");
  const [photo, setPhoto] = useState(item?.photo_url || "");

  const handleFaqPublish = () => {
    setFaqList([...FaqList, { answer: answer, question: question }]);
    setOpenFaqModal(false);
  };
  const handlePublish = () => {
    if (
      areAllKeysNotEmpty(name) &&
      areAllKeysNotEmpty(subDscription) &&
      areAllKeysNotEmpty(dscription) &&
      areAllKeysNotEmpty(question) &&
      areAllKeysNotEmpty(answer) &&
      lat &&
      lng &&
      code &&
      FaqList.length !== 0 &&
      // departures &&
      photo
    ) {
      if (item) {
        dispatch(
          patchDestinations({
            name,
            subDscription,
            dscription,
            lat,
            lng,
            code,
            FaqList,
            // departures,
            photo,
            id: item?.id,
          })
        );
      } else {
        dispatch(
          sendDestination({
            name,
            subDscription,
            dscription,
            lat,
            lng,
            code,
            FaqList,
            // departures,
            photo,
          })
        );
      }
    }
    setOpenModal(false);
  };
  const handleDelete = () => {
    dispatch(deleteDestination({ id: item?.id }));
    setOpenModal(false);
  };

  return (
    <>
      <Wrapper onClick={handleClick}>
        {item ? (
          <>
            <Image src={item?.photo_url} />
            <TextHolder>
              <Text>{item?.name_ru}</Text>
              <Destination>
                <Plane />
                {item?.destination_ru}
              </Destination>
              <Price>{item?.price}</Price>
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
            name,
            subDscription,
            smallDescription: dscription,
            lat,
            lng,
            code,
            FaqList,
            // departures,
            isTitleInput: true,
            isDescEditor: true,
          }}
          canBePublished={
            areAllKeysNotEmpty(name) &&
            areAllKeysNotEmpty(subDscription) &&
            areAllKeysNotEmpty(dscription) &&
            areAllKeysNotEmpty(question) &&
            areAllKeysNotEmpty(answer) &&
            lat &&
            lng &&
            code &&
            FaqList &&
            // departures &&
            photo
          }
          setImage={setPhoto}
          setDescription={setDscription}
          setSubDescription={setSubDscription}
          onClose={handleClick}
          setName={setName}
          setLat={setLat}
          setLng={setLng}
          setCode={setCode}
          // setDepartures={setDepartures}
          handlePublish={handlePublish}
          onDelete={handleDelete}
          isNew={!item}
          image={photo}
          isFAQ={setOpenFaqModal}
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
            areAllKeysNotEmpty(question) && areAllKeysNotEmpty(question)
          }
          onClose={handleFaqClick}
          handlePublish={handleFaqPublish}
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
