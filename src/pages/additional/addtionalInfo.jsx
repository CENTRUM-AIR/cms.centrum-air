import { useDispatch, useSelector } from "react-redux";
import { getAllInfo, getUser } from "../../store";
import {
  setTitleEnglish,
  setPhoto,
  setTitleRussian,
  setTitleUzbek,
  setColor,
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
import {
  CHARTERS,
  CONTACTS,
  COUNTRIES,
  MAINPAGE,
  OFFERS,
  RULES,
  SERVICES,
} from "../../constants";
import {
  fetchCharters,
  fetchCountries,
  fetchMainPage,
  fetchOffers,
  fetchServices,
} from "../../store/get-api-info";
import { useEffect } from "react";

export const useAdditionalInfo = () => {
  const { login: authLogin, role } = useSelector(getUser);
  const dispatch = useDispatch();

  const {
    mainpage,
    offers,
    countries,
    services,
    charters,
    mainpageFetched,
    servicesFetched,
    offersFetched,
    countriesFetched,
    chartersFetched,
    loading,
  } = useSelector(getAllInfo);

  useEffect(() => {
    if (authLogin && role) {
      if (
        !servicesFetched &&
        !offersFetched &&
        !countriesFetched &&
        !chartersFetched &&
        !mainpageFetched &&
        !loading
      ) {
        dispatch(fetchMainPage());
        dispatch(fetchOffers());
        dispatch(fetchServices());
        dispatch(fetchCountries());
        dispatch(fetchCharters());
      }
    }
  }, [
    authLogin,
    role,
    dispatch,
    mainpageFetched,
    servicesFetched,
    offersFetched,
    countriesFetched,
    chartersFetched,
    loading,
  ]);
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
      setColor: (color) => {
        dispatch(setColor(color));
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
    // {
    //   title: "Правила и условия",
    //   type: RULES,
    //   id: 4,
    //   data: [],
    // },
    // {
    //   title: "Контакты",
    //   id: 5,
    //   type: CONTACTS,
    //   data: [],
    // },
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
