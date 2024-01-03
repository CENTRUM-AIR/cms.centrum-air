import React, { useState } from "react";
import {
  Description,
  EmptyHolder,
  SmallDescription,
  Title,
  Wrapper,
} from "./styled";
import SVG from "react-inlinesvg";
import { ReactComponent as PlusSign } from "../../icons/plus-sign.svg";
import { useDispatch } from "react-redux";
import { areAllKeysNotEmpty } from "../../utils/obj-not-empty";
import { patchServices } from "../../store/create-additional-service/patch";
import { sendServices } from "../../store/create-additional-service/post";
import { deleteService } from "../../store/create-additional-service/delete";
import Design from "../creation/design";

export const ServicesComp = ({ item }) => {
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
  const [icon, setIcon] = useState(item?.icon || "");
  const handlePublish = () => {
    if (
      areAllKeysNotEmpty(title) &&
      areAllKeysNotEmpty(smallDescription) &&
      areAllKeysNotEmpty(description) &&
      icon
    ) {
      if (item) {
        dispatch(
          patchServices({
            title,
            smallDescription,
            description,
            icon,
            id: item?.id,
          })
        );
      } else {
        dispatch(
          sendServices({
            title,
            smallDescription,
            description,
            icon,
          })
        );
      }
    }
    setOpenModal(false);
  };
  const handleDelete = () => {
    dispatch(deleteService({ id: item?.id }));
    setOpenModal(false);
  };
  return (
    <>
      <Wrapper onClick={handleClick}>
        {item ? (
          <>
            <SVG width="64" height="64" src={item?.icon} />
            <Title>{item?.title_ru}</Title>
            <SmallDescription>{item?.small_description_ru}</SmallDescription>
            <Description>{item?.description_ru}</Description>
          </>
        ) : (
          <EmptyHolder>
            <p>Добавить новое </p>
            <PlusSign />
          </EmptyHolder>
        )}
      </Wrapper>
      {openModal && (
        <Design
          titleText="Дополнительные сервисы"
          item={{ title, smallDescription, description, isTitleInput: true }}
          canBePublished={
            areAllKeysNotEmpty(title) &&
            areAllKeysNotEmpty(smallDescription) &&
            areAllKeysNotEmpty(description) &&
            icon
          }
          setText={setTitle}
          setSmallDescription={setSmallDescription}
          setDescription={setDescription}
          setImage={setIcon}
          image={icon}
          onClose={handleClick}
          handlePublish={handlePublish}
          onDelete={handleDelete}
          isNew={!item}
          fileType=".svg"
        />
      )}
    </>
  );
};
