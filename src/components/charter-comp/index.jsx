import React, { useState } from "react";
import { Charter, CharterWrapper } from "./styled";
import { ReactComponent as CharterArrow } from "../../icons/charter-arrow.svg";
import { ReactComponent as PlusSign } from "../../icons/plus-sign.svg";
import { useDispatch } from "react-redux";
import { sendCharters } from "../../store/create-charter/post";
import { deleteCharter } from "../../store/create-charter/delete";
import { patchCharters } from "../../store/create-charter/patch";
import Design from "../creation/design";
import { areAllKeysNotEmpty } from "../../utils/obj-not-empty";

export const CharterComp = ({ item }) => {
  const [openModal, setOpenModal] = useState(false);
  const handleClick = (e) => setOpenModal(!openModal);
  const dispatch = useDispatch();
  const [fromCity, setFromCity] = useState({
    uz: item?.from_city_uz || "",
    ru: item?.from_city_ru || "",
    en: item?.from_city_en || "",
  });
  const [toCity, setToCity] = useState({
    uz: item?.to_city_uz || "",
    ru: item?.to_city_ru || "",
    en: item?.to_city_en || "",
  });
  const [phoneNumber, setPhoneNumber] = useState(item?.phone_number || "");
  const handlePublish = () => {
    if (
      areAllKeysNotEmpty(fromCity) &&
      areAllKeysNotEmpty(toCity) &&
      phoneNumber
    ) {
      if (item) {
        dispatch(
          patchCharters({
            fromCity,
            toCity,
            phoneNumber,
            id: item?.id,
          })
        );
      } else {
        dispatch(
          sendCharters({
            fromCity,
            toCity,
            phoneNumber,
          })
        );
      }
    }
    setOpenModal(false);
  };
  const handleDelete = () => {
    dispatch(deleteCharter({ id: item?.id }));
    setOpenModal(false);
  };
  return (
    <>
      <Charter onClick={handleClick}>
        {item ? (
          <>
            <CharterWrapper>
              {item?.from_city_ru}
              <CharterArrow />
              {item?.to_city_ru}
            </CharterWrapper>
            <p>{item?.phone_number}</p>
          </>
        ) : (
          <CharterWrapper>
            <p>Добавить новое</p>
            <PlusSign />
          </CharterWrapper>
        )}
      </Charter>
      {openModal && (
        <Design
          titleText="Чартеры"
          item={{ fromCity, toCity, phoneNumber }}
          canBePublished={
            areAllKeysNotEmpty(fromCity) &&
            areAllKeysNotEmpty(toCity) &&
            phoneNumber
          }
          onClose={handleClick}
          setFrom={setFromCity}
          setTo={setToCity}
          setPhoneNumber={setPhoneNumber}
          handlePublish={handlePublish}
          onDelete={handleDelete}
          isNew={!item}
          isPhoto={false}
        />
      )}
    </>
  );
};
