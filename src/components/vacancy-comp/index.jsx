import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { areAllKeysNotEmpty } from "../../utils/obj-not-empty";
import Design from "../creation/design";
import { ReactComponent as PlusSign } from "../../icons/plus-sign.svg";
import {
  Description,
  EmptyHolder,
  Image,
  SmallDescription,
  Title,
  Wrapper,
} from "./styled";
import { sendVacancy } from "../../store/vacancies/post";
import { patchVacancy } from "../../store/vacancies/edit";
import { deleteVacancy } from "../../store/vacancies/delete";

export const VacancyComp = ({ item }) => {
  const [openModal, setOpenModal] = useState(false);
  const handleClick = (e) => setOpenModal(!openModal);
  const dispatch = useDispatch();
  const [title, setTitle] = useState({
    uz: item?.title_uz || "",
    ru: item?.title_ru || "",
    en: item?.title_en || "",
  });
  const [smallDescription, setSmallDescription] = useState({
    uz: item?.small_description_uz || "",
    ru: item?.small_description_ru || "",
    en: item?.small_description_en || "",
  });
  const [description, setDescription] = useState({
    uz: item?.description_uz || "",
    ru: item?.description_ru || "",
    en: item?.description_en || "",
  });
  const [photo, setPhoto] = useState(item?.photo_url || "");
  const handlePublish = () => {
    if (
      areAllKeysNotEmpty(title) &&
      areAllKeysNotEmpty(smallDescription) &&
      areAllKeysNotEmpty(description) &&
      photo
    ) {
      if (item) {
        dispatch(
          patchVacancy({
            title,
            smallDescription,
            description,
            photo,
            id: item?.id,
          })
        );
      } else {
        dispatch(
          sendVacancy({
            title,
            smallDescription,
            description,
            photo,
          })
        );
      }
    }
    setOpenModal(false);
  };
  const handleDelete = () => {
    dispatch(deleteVacancy({ id: item?.id }));
    setOpenModal(false);
  };
  return (
    <>
      {item ? (
        <Wrapper onClick={handleClick}>
          <Image src={item?.photo_url} />
          <Title>{item?.title_ru}</Title>
          <SmallDescription>{item?.small_description_ru}</SmallDescription>
          <Description
            dangerouslySetInnerHTML={{ __html: item?.description_ru }}
          />
        </Wrapper>
      ) : (
        <EmptyHolder>
          <p>Добавить новое </p>
          <PlusSign />
        </EmptyHolder>
      )}
      {openModal && (
        <Design
          titleText="Вакансия"
          item={{
            title,
            smallDescription,
            description,
            isTitleInput: true,
            isDescEditor: true,
          }}
          canBePublished={
            areAllKeysNotEmpty(title) &&
            areAllKeysNotEmpty(smallDescription) &&
            areAllKeysNotEmpty(description) &&
            photo
          }
          setText={setTitle}
          setSmallDescription={setSmallDescription}
          setDescription={setDescription}
          setImage={setPhoto}
          image={photo}
          onClose={handleClick}
          handlePublish={handlePublish}
          onDelete={handleDelete}
          isNew={!item}
        />
      )}
    </>
  );
};
