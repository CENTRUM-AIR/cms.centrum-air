import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useCreationConfig } from "../../utils/creation-config";
import Design from "./design";

export const Creation = ({
  actionType,
  onClose,
  setEnglish,
  setRussian,
  setUzbek,
  setFile,
  setPrice,
  setCode,
  setPhoneNumber,
  titleText,
  sendInfo,
}) => {
  const { selector } = useCreationConfig(actionType);
  const selectorData = useSelector(selector);
  const [language, setLanguage] = useState("ru");
  const [inputTitle, setInputTitle] = useState(""); // used as country name
  const [description, setDescription] = useState(""); // used as city (& to_city) name
  const [shortDescription, setShortDescription] = useState(""); // used as from_city name
  const [image, setImage] = useState(null);
  const [inputPrice, setInputPrice] = useState("");
  const [destination, setDestination] = useState("");
  const [code, setCityCode] = useState("");
  const [phoneNumber, setNewPhoneNumber] = useState("");

  useEffect(() => {
    setInputTitle(selectorData?.[`title_${language}`] || "");
    setDescription(selectorData?.[`description_${language}`] || "");
    setShortDescription(selectorData?.[`small_description_${language}`] || "");
    setDestination(selectorData?.[`destination_${language}`] || "");

    if (
      selectorData?.[`country_${language}`] ||
      selectorData?.[`city_${language}`]
    ) {
      setInputTitle(selectorData?.[`country_${language}`] || "");
      setDescription(selectorData?.[`city_${language}`] || "");
    }

    if (
      selectorData?.[`from_city_${language}`] ||
      selectorData?.[`to_city_${language}`]
    ) {
      setDescription(selectorData?.[`to_city_${language}`] || "");
      setShortDescription(selectorData?.[`from_city_${language}`] || "");
    }

    if (selectorData?.photo) {
      setImage(selectorData?.photo);
    }

    if (selectorData?.price?.price) {
      setInputPrice(selectorData?.price?.price);
    }

    if (selectorData?.city_code) {
      setCityCode(selectorData?.city_code);
    }

    if (selectorData?.phone_number) {
      setNewPhoneNumber(selectorData?.phone_number);
    }
  }, [language]);

  const collectData = () => {
    const readyData = {
      title: inputTitle,
      description,
      small_description: shortDescription,
      destination,
      country: inputTitle,
      city: description,
      to_city: description,
      from_city: shortDescription,
    };
    if (language === "ru") setRussian(readyData);
    if (language === "en") setEnglish(readyData);
    if (language === "uz") setUzbek(readyData);
    setPrice && setPrice({ price: inputPrice });
    setFile && setFile(image);
    setCode && setCode({ city_code: code });
    setPhoneNumber && setPhoneNumber({ phone_number: phoneNumber });
  };

  const nextLanguage = (newType, goNext) => {
    collectData();
    if (goNext) {
      if (language === "ru") setLanguage("en");
      else if (language === "en") setLanguage("uz");
      else if (language === "uz") setLanguage("ru");
    } else {
      setLanguage(newType);
    }
  };

  const publishInfo = async () => {
    collectData();
    await sendInfo();
  };

  return (
    <Design
      actionType={actionType}
      titleText={titleText}
      onClose={onClose}
      language={language}
      nextLanguage={nextLanguage}
      inputTitle={inputTitle}
      setInputTitle={setInputTitle}
      shortDescription={shortDescription}
      setShortDescription={setShortDescription}
      inputPrice={inputPrice}
      setInputPrice={setInputPrice}
      destination={destination}
      setDestination={setDestination}
      description={description}
      setDescription={setDescription}
      image={image}
      setImage={setImage}
      code={code}
      setCityCode={setCityCode}
      phoneNumber={phoneNumber}
      setNewPhoneNumber={setNewPhoneNumber}
      publishInfo={publishInfo}
    />
  );
};
