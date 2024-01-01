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

export const DestinationComp = ({ item }) => {
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const handleClick = (e) => setOpenModal(!openModal);
  const [title, setTitle] = useState({
    uz: item?.title_uz || "",
    ru: item?.title_ru || "",
    en: item?.title_en || "",
  });
  const [destination, setDestination] = useState({
    uz: item?.destination_uz || "",
    ru: item?.destination_ru || "",
    en: item?.destination_en || "",
  });
  const [description, setDescription] = useState({
    uz: item?.description_uz || "",
    ru: item?.description_ru || "",
    en: item?.description_en || "",
  });
  const [price, setPrice] = useState(item?.price || "");
  const [photo, setPhoto] = useState(item?.photo_url || "");
  const handlePublish = () => {
    if (
      areAllKeysNotEmpty(title) &&
      areAllKeysNotEmpty(destination) &&
      price &&
      photo
    ) {
      if (item) {
        dispatch(
          patchDestinations({
            title,
            description,
            destination,
            price,
            photo,
            id: item?.id,
          })
        );
      } else {
        dispatch(
          sendDestination({
            title,
            description,
            destination,
            price,
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
              <Text>{item?.title_ru}</Text>
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
          item={{ title, description, smallDescription: destination, price }}
          canBePublished={
            areAllKeysNotEmpty(title) &&
            areAllKeysNotEmpty(destination) &&
            price &&
            photo
          }
          setSmallDescription={setDestination}
          setDescription={setDescription}
          onClose={handleClick}
          setText={setTitle}
          setPrice={setPrice}
          handlePublish={handlePublish}
          onDelete={handleDelete}
          isNew={!item}
          image={photo}
          shortDescTitle="Направление"
        />
      )}
    </>
  );
};
