import React, { useState } from "react";
import { EmptyHolder, Image, NewsContainer, NewsTitle } from "./styled";
import { useDispatch } from "react-redux";
import { ReactComponent as PlusSign } from "../../icons/plus-sign.svg";
import Design from "../creation/design";
import { areAllKeysNotEmpty } from "../../utils/obj-not-empty";
import { deleteNews } from "../../store/create-news/delete";
import { patchNews } from "../../store/create-news/edit";
import { sendNews } from "../../store/create-news/post";

export const NewsComp = ({ item }) => {
  const [openModal, setOpenModal] = useState(false);
  const handleClick = (e) => setOpenModal(!openModal);
  const dispatch = useDispatch();
  const [title, setTitle] = useState({
    uz: item?.title_uz || "",
    ru: item?.title_ru || "",
    en: item?.title_en || "",
  });
  const [description, setDescription] = useState({
    uz: item?.description_uz || "",
    ru: item?.description_ru || "",
    en: item?.description_en || "",
  });
  const [image, setImage] = useState(item?.photo_url || "");

  const handlePublish = () => {
    return;
    if (areAllKeysNotEmpty(title) && areAllKeysNotEmpty(description) && image) {
      if (item) {
        dispatch(
          patchNews({
            title,
            description,
            photo: image,
            id: item?.id,
          })
        );
      } else {
        dispatch(
          sendNews({
            title,
            description,
            photo: image,
          })
        );
      }
    }
    setOpenModal(false);
  };
  const handleDelete = () => {
    dispatch(deleteNews({ id: item?.id }));
    setOpenModal(false);
  };
  return (
    <>
      <NewsContainer onClick={handleClick}>
        {item ? (
          <>
            <Image src={item?.photo_url} />
            <NewsTitle>{item?.title_ru}</NewsTitle>
          </>
        ) : (
          <EmptyHolder>
            <p>Добавить новое</p>
            <PlusSign />
          </EmptyHolder>
        )}
      </NewsContainer>
      {openModal && (
        <Design
          titleText="Добавить новость"
          item={{ title, description, isTitleInput: true, isDescEditor: true }}
          canBePublished={
            areAllKeysNotEmpty(title) &&
            image &&
            areAllKeysNotEmpty(description)
          }
          image={image}
          onClose={handleClick}
          setDescription={setDescription}
          setText={setTitle}
          setImage={setImage}
          handlePublish={handlePublish}
          onDelete={handleDelete}
          isNew={!item}
        />
      )}
    </>
  );
};
