import {
  getCharters,
  getCountries,
  getDestinations,
  getMainPage,
  getServices,
} from "../store";

export const creationConfig = (type) => {
  switch (type) {
    case "mainpage":
      return {
        selector: getMainPage,
        smallDesc: false,
        title: "Main Page",
        mainText: true,
        isFileNeeded: true,
      };
    case "offers":
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
    case "services":
      return {
        selector: getServices,
        smallDesc: true,
        fileType: ".svg",
        title: "Доп. услуги",
        isTextArea: true,
        mainText: true,
        isFileNeeded: true,
      };
    case "countries":
      return {
        selector: getCountries,
        title: "Список Стран и Городов",
        cityCode: true,
        countryName: true,
        cityName: true,
      };
    case "charters":
      return {
        selector: getCharters,
        title: "Чартерные рейсы",
        cityName: true,
        fromCityName: true,
        isPhoneNumber: true,
      };
    default:
      break;
  }
};
