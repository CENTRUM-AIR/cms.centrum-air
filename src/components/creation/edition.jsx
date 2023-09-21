import React, { useEffect, useState } from "react";
import Design from "./design";
import { creationConfig } from "../../utils/creation-config";
import { useSelector } from "react-redux";
import { patchAllInfo } from "../../store";

const Edition = ({ actionType, onClose, titleText, sendInfo, itemId }) => {
  const { selector } = creationConfig(actionType);
  const selectorData = useSelector(selector);

  const { error: apiError, sent } = useSelector(patchAllInfo);
  const [language, setLanguage] = useState("ru");
  const [inputTitle, setInputTitle] = useState({
    ru: selectorData?.title_ru || selectorData?.country_ru || "",
    en: selectorData?.title_en || selectorData?.country_en || "",
    uz: selectorData?.title_uz || selectorData?.country_uz || "",
  });
  const [description, setDescription] = useState({
    ru:
      selectorData?.description_ru ||
      selectorData?.city_ru ||
      selectorData?.to_city_ru ||
      "",
    en:
      selectorData?.description_en ||
      selectorData?.city_en ||
      selectorData?.to_city_en ||
      "",
    uz:
      selectorData?.description_uz ||
      selectorData?.city_uz ||
      selectorData?.to_city_uz ||
      "",
  }); // used as city (& to_city) name
  const [shortDescription, setShortDescription] = useState({
    ru: selectorData?.small_description_ru || selectorData?.from_city_ru || "",
    en: selectorData?.small_description_en || selectorData?.from_city_en || "",
    uz: selectorData?.small_description_uz || selectorData?.from_city_uz || "",
  });
  const [image, setImage] = useState(selectorData?.photo || "");
  const [inputPrice, setInputPrice] = useState(
    selectorData?.price?.price || ""
  );
  const [destination, setDestination] = useState({
    ru: selectorData?.destination_ru || "",
    en: selectorData?.destination_en || "",
    uz: selectorData?.destination_uz || "",
  });
  const [code, setCityCode] = useState(selectorData?.city_code || "");
  const [phoneNumber, setNewPhoneNumber] = useState(
    selectorData?.phone_number || ""
  );
  const [isDataSent, setIsDataSent] = useState(false);

  const nextLanguage = (newType, goNext) => {
    if (goNext) {
      if (language === "ru") setLanguage("en");
      else if (language === "en") setLanguage("uz");
      else if (language === "uz") setLanguage("ru");
    } else {
      setLanguage(newType);
    }
  };

  const changeTitle = (text) => {
    setInputTitle({ ...inputTitle, [language]: text });
  };

  const changeDescription = (text) => {
    setDescription({ ...description, [language]: text });
  };
  const changeShortDescription = (text) =>
    setShortDescription({ ...shortDescription, [language]: text });
  const changeDestination = (text) =>
    setDestination({ ...destination, [language]: text });
  const changePrice = (text) => setInputPrice(text);
  const changeCode = (text) => setCityCode(text);
  const changePhoneNumber = (text) => setNewPhoneNumber(text);
  const changeImage = (image) => setImage(image);

  const publishInfo = async () => {
    await sendInfo({
      title: inputTitle,
      description: description,
      small_description: shortDescription,
      destination: destination,
      country: inputTitle,
      city: description,
      to_city: description,
      from_city: shortDescription,
      photo: image,
      price: inputPrice,
      city_code: code,
      phone_number: phoneNumber,
      id: itemId,
    });
    setIsDataSent(true);
  };

  useEffect(() => {
    if (!apiError && sent && isDataSent) {
      onClose();
    } else if (apiError && isDataSent) {
      window.alert(
        "Что-то пошло не так! \nПроверьте все данные, они либо совпадают с данными в датабазе, либо у вас пустые поля"
      );
    }
    setIsDataSent(false);
  }, [apiError, sent, isDataSent]);

  return (
    <Design
      actionType={actionType}
      titleText={titleText}
      onClose={onClose}
      language={language}
      nextLanguage={nextLanguage}
      inputTitle={inputTitle[language]}
      setInputTitle={changeTitle}
      shortDescription={shortDescription[language]}
      setShortDescription={changeShortDescription}
      inputPrice={inputPrice}
      setInputPrice={changePrice}
      destination={destination[language]}
      setDestination={changeDestination}
      description={description[language]}
      setDescription={changeDescription}
      image={image}
      setImage={changeImage}
      code={code}
      setCityCode={changeCode}
      phoneNumber={phoneNumber}
      setNewPhoneNumber={changePhoneNumber}
      publishInfo={publishInfo}
    />
  );
};

export default Edition;
