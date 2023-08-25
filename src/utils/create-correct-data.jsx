import { useCallback } from "react";
import { getServices, getDestinations, getMainPage } from "../store";
import { useSelector } from "react-redux";

export const usePublishInfo = async ({
  actionType,
  inputTitle,
  description,
  destination,
  shortDescription,
  image,
  inputPrice,
  type,
  icon,
}) => {
  const {
    title_uz: title_uz_service,
    title_ru: title_ru_service,
    title_en: title_en_service,
    description_uz: description_uz_service,
    description_ru: description_ru_service,
    description_en: description_en_service,
    small_description_uz: small_description_uz_service,
    small_description_ru: small_description_ru_service,
    small_description_en: small_description_en_service,
    icon: icon_service,
  } = useSelector(getServices);
  const {
    title_uz: title_uz_dest,
    title_ru: title_ru_dest,
    title_en: title_en_dest,
    description_uz: description_uz_dest,
    description_ru: description_ru_dest,
    description_en: description_en_dest,
    destination_uz,
    destination_ru,
    destination_en,
    price: price_dest,
    photo: photo_dest,
  } = useSelector(getDestinations);
  const {
    title_uz: title_uz_main,
    title_ru: title_ru_main,
    title_en: title_en_main,
    photo,
  } = useSelector(getMainPage);
  const getCorrectData = useCallback(() => {
    switch (actionType) {
      case "mainpage":
        const formData = new FormData();
        if (type === "ru") {
          formData.append("ru", inputTitle);
          formData.append("en", title_en_main);
          formData.append("uz", title_uz_main);
        } else if (type === "en") {
          formData.append("ru", title_ru_main);
          formData.append("en", inputTitle);
          formData.append("uz", title_uz_main);
        } else if (type === "uz") {
          formData.append("ru", title_ru_main);
          formData.append("en", title_en_main);
          formData.append("uz", inputTitle);
        }
        if (image?.photo?.preview) {
          formData.append("file", image?.photo);
        }
        return formData;
      case "offers":
        const formDataDest = new FormData();
        if (type === "ru") {
          formDataDest.append("title_ru", inputTitle);
          formDataDest.append("title_en", title_en_dest);
          formDataDest.append("title_uz", title_uz_dest);

          formDataDest.append("description_ru", description);
          formDataDest.append("description_en", description_en_dest);
          formDataDest.append("description_uz", description_uz_dest);

          formDataDest.append("destination_ru", destination);
          formDataDest.append("destination_en", destination_en);
          formDataDest.append("destination_uz", destination_uz);
        } else if (type === "en") {
          formDataDest.append("title_ru", title_ru_dest);
          formDataDest.append("title_en", inputTitle);
          formDataDest.append("title_uz", title_uz_dest);

          formDataDest.append("description__ru", description_ru_dest);
          formDataDest.append("description_en", description);
          formDataDest.append("description_uz", description_uz_dest);

          formDataDest.append("destination__ru", destination_ru);
          formDataDest.append("destination_en", destination);
          formDataDest.append("destination_uz", destination_uz);
        } else if (type === "uz") {
          formDataDest.append("title_ru", title_ru_dest);
          formDataDest.append("title_en", title_en_dest);
          formDataDest.append("title_uz", inputTitle);

          formDataDest.append("description_ru", description_ru_dest);
          formDataDest.append("description_en", description_en_dest);
          formDataDest.append("description_uz", description);

          formDataDest.append("destination_ru", destination_ru);
          formDataDest.append("destination_en", destination_en);
          formDataDest.append("destination_uz", destination);
        }
        if (image?.photo?.preview) {
          formDataDest.append("file", image?.photo);
        }
        if (inputPrice) {
          formDataDest.append("price", price_dest?.price || inputPrice?.price);
        }
        return formDataDest;
      case "services":
        let requestBody = {};
        if (type === "ru") {
          requestBody = {
            title_ru: inputTitle,
            title_en: title_en_service,
            title_uz: title_uz_service,
            description_ru: description,
            description_en: description_en_service,
            description_uz: description_uz_service,
            small_description_ru: shortDescription,
            small_description_en: small_description_en_service,
            small_description_uz: small_description_uz_service,
          };
        } else if (type === "en") {
          requestBody = {
            title_ru: title_ru_service,
            title_en: inputTitle,
            title_uz: title_uz_service,
            description_ru: description_ru_service,
            description_en: description,

            description_uz: description_uz_service,
            small_description_ru: small_description_ru_service,
            small_description_en: shortDescription,
            small_description_uz: small_description_uz_service,
          };
        } else if (type === "uz") {
          requestBody = {
            title_ru: title_ru_service,
            title_en: title_en_service,
            title_uz: inputTitle,
            description_ru: description_ru_service,
            description_en: description_en_service,

            description_uz: description,
            small_description_ru: small_description_ru_service,
            small_description_en: small_description_en_service,
            small_description_uz: shortDescription,
          };
        }
        if (image?.photo?.preview) {
          requestBody.icon = icon.photo;
        }
        return requestBody;
      default:
        break;
    }
  }, []);
  return getCorrectData;
};
