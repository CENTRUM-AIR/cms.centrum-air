import { useDispatch, useSelector } from "react-redux";
import { getAllInfo } from "../../store";
import {
  setTitleEnglish,
  setPhoto,
  setTitleRussian,
  setTitleUzbek,
} from "../../store/create-main-page";
import {
  setServiceEnglish,
  setServiceIcon,
  setServiceRussian,
  setServiceUzbek,
} from "../../store/create-additional-service";
import {
  setDestinationEnglish,
  setPhoto as setDestinationPhoto,
  setDestinationRussian,
  setDestinationUzbek,
  setPrice,
} from "../../store/create-destinations";
import {
  setCountriesEnglish,
  setCountriesRussian,
  setCountriesUzbek,
  setCountriesCode,
} from "../../store/create-countries";
import {
  setChartersEnglish,
  setChartersRussian,
  setChartersUzbek,
  setPhoneNumber,
} from "../../store/create-charter";
import {
  sendCharters,
  sendCountries,
  sendMainPage,
  sendOffers,
  sendServices,
} from "../../store/send-api-info";
import {
  patchCharters,
  patchCountries,
  patchMainPage,
  patchOffers,
  patchServices,
} from "../../store/patch-api-info";
import { CHARTERS, COUNTRIES, MAINPAGE, OFFERS, SERVICES } from "../../constants";

export const useAdditionalInfo = () => {
  const { mainpage, offers, countries, services, charters } =
    useSelector(getAllInfo);
  const dispatch = useDispatch();
  return [
    {
      title: "Main Page",
      type: MAINPAGE,
      id: 1,
      data: mainpage,
      setEnglish: (title) => {
        dispatch(setTitleEnglish(title));
      },
      setRussian: (title) => {
        dispatch(setTitleRussian(title));
      },
      setUzbek: (title) => {
        dispatch(setTitleUzbek(title));
      },
      setPhoto: (photo) => {
        dispatch(setPhoto(photo));
      },
      sendInfo: () => dispatch(sendMainPage()),
      updateInfo: (data) => dispatch(patchMainPage(data)),
    },
    {
      title: "Список Стран и Городов",
      type: COUNTRIES,
      id: 2,
      data: countries,
      setEnglish: (info) => dispatch(setCountriesEnglish(info)),
      setRussian: (info) => dispatch(setCountriesRussian(info)),
      setUzbek: (info) => dispatch(setCountriesUzbek(info)),
      setCode: (info) => dispatch(setCountriesCode(info)),
      sendInfo: () => dispatch(sendCountries()),
      updateInfo: (data) => dispatch(patchCountries(data)),
    },
    {
      title: "Чартерные рейсы",
      type: CHARTERS,
      id: 8,
      data: charters,
      setEnglish: (info) => dispatch(setChartersEnglish(info)),
      setRussian: (info) => dispatch(setChartersRussian(info)),
      setUzbek: (info) => dispatch(setChartersUzbek(info)),
      setPhoneNumber: (info) => dispatch(setPhoneNumber(info)),
      sendInfo: () => dispatch(sendCharters()),
      updateInfo: (data) => dispatch(patchCharters(data)),
    },
    {
      title: "Актуальные направления",
      id: 3,
      type: OFFERS,
      data: offers,
      setEnglish: (info) => {
        dispatch(setDestinationEnglish(info));
      },
      setRussian: (info) => {
        dispatch(setDestinationRussian(info));
      },
      setUzbek: (info) => {
        dispatch(setDestinationUzbek(info));
      },
      setPrice: (price) => {
        dispatch(setPrice(price));
      },
      setPhoto: (photo) => {
        dispatch(setDestinationPhoto(photo));
      },
      sendInfo: () => dispatch(sendOffers()),
      updateInfo: (data) => dispatch(patchOffers(data)),
    },
    {
      title: "Правила и условия",
      id: 4,
      type: "simple",
      data: [],
    },
    {
      title: "Контакты",
      id: 5,
      type: "simple",
      data: [],
    },
    {
      title: "Доп услуги",
      id: 7,
      type: SERVICES,
      data: services,
      setEnglish: (info) => {
        dispatch(setServiceEnglish(info));
      },
      setRussian: (info) => {
        dispatch(setServiceRussian(info));
      },
      setUzbek: (info) => {
        dispatch(setServiceUzbek(info));
      },
      setPrice: (price) => {
        dispatch(setPrice(price));
      },
      setPhoto: (photo) => {
        dispatch(setServiceIcon(photo));
      },
      sendInfo: () => dispatch(sendServices()),
      updateInfo: (data) => dispatch(patchServices(data)),
    },
  ];
};
