import React, { useState } from "react";
import { Image, PlusCircle, PlusHolder, Text, Wrapper } from "./styled";
import Design from "../creation/design";
import { ReactComponent as PlusSign } from "../../icons/plus-sign.svg";
import { useDispatch } from "react-redux";
import { patchMainPage } from "../../store/create-main-page/patch";
import { sendMainPage } from "../../store/create-main-page/post";
import { deleteMainPage } from "../../store/create-main-page/delete";
import { areAllKeysNotEmpty } from "../../utils/obj-not-empty";

export const MainPageComp = ({ item }) => {
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [text, setText] = useState({
    ru: item?.title_ru || "",
    en: item?.title_en || "",
    uz: item?.title_uz || "",
  });
  const [order, setOrder] = useState(item?.order_number || "");
  const [image, setImage] = useState(item?.photo_url || "");
  const handleClick = (e) => setOpenModal(!openModal);

  const handlePublish = () => {
    if (areAllKeysNotEmpty(text) && image && order) {
      if (item) {
        dispatch(
          patchMainPage({
            title: text,
            photo: image,
            order,
            id: item?.id,
          })
        );
      } else {
        dispatch(
          sendMainPage({
            title: text,
            photo: image,
            order,
          })
        );
      }
    }
    setOpenModal(false);
  };
  const handleDelete = () => {
    dispatch(deleteMainPage({ id: item?.id }));
    setOpenModal(false);
  };
  return (
    <>
      <Wrapper onClick={handleClick}>
        {!item ? (
          <PlusHolder onClick={handleClick}>
            <PlusCircle>
              <PlusSign />
            </PlusCircle>
            <p>Добавить новое</p>
          </PlusHolder>
        ) : (
          <>
            <Image src={item?.photo_url} />
            <Text dangerouslySetInnerHTML={{ __html: item?.title_ru }} />
          </>
        )}
      </Wrapper>
      {openModal && (
        <Design
          titleText="Main Page Component"
          item={{ title: text, order }}
          canBePublished={areAllKeysNotEmpty(text) && image && order}
          image={image}
          onClose={handleClick}
          setText={setText}
          setImage={setImage}
          setOrder={setOrder}
          handlePublish={handlePublish}
          onDelete={handleDelete}
          isNew={!item}
        />
      )}
    </>
  );
};
