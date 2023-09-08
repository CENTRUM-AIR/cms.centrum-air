import { getDestinations, getMainPage, getServices } from "../store";

export const creationConfig = (type) => {
  switch (type) {
    case "mainpage":
      return {
        selector: getMainPage,
        smallDesc: false,
        title: "Main Page",
      };
    case "offers":
      return {
        selector: getDestinations,
        smallDesc: false,
        destination: true,
        price: true,
        title: "Актуальные направления",
        isTextArea: true,
      };
    case "services":
      return {
        selector: getServices,
        smallDesc: true,
        fileType: ".svg",
        title: "Доп. услуги",
        isTextArea: true,
      };
    default:
      break;
  }
};
