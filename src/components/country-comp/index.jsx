import React, { useState } from "react";
import { Wrapper } from "./styled";
import { useDispatch } from "react-redux";
import { areAllKeysNotEmpty } from "../../utils/obj-not-empty";
import { patchCountries } from "../../store/create-countries/patch";
import { sendCountries } from "../../store/create-countries/post";
import { deleteCountry } from "../../store/create-countries/delete";
import { ReactComponent as PlusSign } from "../../icons/plus-sign.svg";
import Design from "../creation/design";

export const CountryComp = ({ item }) => {
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const handleClick = () => setOpenModal(!openModal);
  const [city, setCity] = useState({
    uz: item?.city_uz || "",
    ru: item?.city_ru || "",
    en: item?.city_en || "",
  });
  const [isSearch, setIsSearch] = useState(false);
  const [country, setCountry] = useState({
    uz: item?.country_uz || "",
    ru: item?.country_ru || "",
    en: item?.country_en || "",
  });
  const [cityCode, setCityCode] = useState(item?.city_code || "");
  const handlePublish = () => {
    if (areAllKeysNotEmpty(city) && areAllKeysNotEmpty(country) && cityCode) {
      if (item) {
        dispatch(
          patchCountries({
            cityCode,
            city,
            country,
            isSearch,
            id: item?.id,
          })
        );
      } else {
        dispatch(
          sendCountries({
            cityCode,
            city,
            country,
            isSearch,
          })
        );
      }
    }
    setOpenModal(false);
  };
  const handleDelete = () => {
    dispatch(deleteCountry({ id: item?.id }));
    setOpenModal(false);
  };
  return (
    <>
      <Wrapper onClick={handleClick}>
        {item ? (
          <>
            <p>{item?.country_ru}</p>
            <p>{item?.city_ru}</p>
            <p>{item?.is_search ? "Да" : "Нет"}</p>
            <span>{item?.city_code}</span>
          </>
        ) : (
          <>
            <p style={{ width: "100%" }}>Создать новое</p>
            <PlusSign />
          </>
        )}
      </Wrapper>
      {openModal && (
        <Design
          titleText="Страны и Города"
          item={{ city, country, cityCode, isSearch }}
          canBePublished={
            areAllKeysNotEmpty(city) && areAllKeysNotEmpty(country) && cityCode
          }
          onClose={handleClick}
          setCity={setCity}
          setCountry={setCountry}
          setIsSearch={setIsSearch}
          setCityCode={setCityCode}
          handlePublish={handlePublish}
          onDelete={handleDelete}
          isNew={!item}
          isPhoto={false}
        />
      )}
    </>
  );
};
