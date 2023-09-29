import { useCallback } from "react";
import {
  CHARTERS,
  COUNTRIES,
  MAINPAGE,
  NEWS,
  OFFERS,
  SERVICES,
} from "../constants";
import {
  getCharters,
  getCountries,
  getDestinations,
  getMainPage,
  getNews,
  getServices,
} from "../store";

export const useCreationConfig = (type) => {
  const config = useCallback(() => {
    switch (type) {
      case MAINPAGE:
        return {
          selector: getMainPage,
          smallDesc: false,
          title: "Main Page",
          mainText: true,
          isFileNeeded: true,
        };
      case OFFERS:
        return {
          selector: getDestinations,
          smallDesc: false,
          destination: true,
          price: true,
          title: "Актуальные направления",
          isTextArea: true,
          mainText: true,
          isFileNeeded: true,
        };
      case SERVICES:
        return {
          selector: getServices,
          smallDesc: true,
          fileType: ".svg",
          title: "Доп. услуги",
          isTextArea: true,
          mainText: true,
          isFileNeeded: true,
        };
      case COUNTRIES:
        return {
          selector: getCountries,
          title: "Список Стран и Городов",
          cityCode: true,
          countryName: true,
          cityName: true,
        };
      case CHARTERS:
        return {
          selector: getCharters,
          title: "Чартерные рейсы",
          cityName: true,
          fromCityName: true,
          isPhoneNumber: true,
        };
      case NEWS:
        return {
          selector: getNews,
          title: "Новости",
          mainText: true,
          isTextArea: true,
          smallDesc: true,
          isFileNeeded: true,
        };
      default:
        break;
    }
    return;
  }, [type]);
  return config();
};
