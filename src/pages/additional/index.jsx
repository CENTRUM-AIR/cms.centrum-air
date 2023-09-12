import React, { useState } from "react";
import {
  AddText,
  ButtonsWrapper,
  IconWrapper,
  ItemActions,
  ItemText,
  ItemTextWrapper,
  ItemWrapper,
  Wrapper,
} from "./styled";
import { ReactComponent as PlusSign } from "../../icons/plus-sign.svg";
import { ReactComponent as Edit } from "../../icons/edit.svg";
import { ReactComponent as Delete } from "../../icons/delete.svg";
import { Creation } from "../../components/creation";
import { useDispatch, useSelector } from "react-redux";
import {
  setTitleEnglish,
  setPhoto,
  setTitleRussian,
  setTitleUzbek,
} from "../../store/create-main-page";
import SVG from "react-inlinesvg";
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
import { Modal } from "../../components/Modal";
import { StyledButton } from "../../shared_styled";
import { getAllInfo } from "../../store";
import api from "../../utils/api";
import { deleteInfo } from "../../store/get-api-info";

export const Additional = () => {
  const { mainpage, offers, countries, services, charters } =
    useSelector(getAllInfo);
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState({
    actionType: "",
    id: "",
  });
  const [toDelete, setToDelete] = useState("");

  const handleDelete = async (id, type) => {
    await api.delete(`/${type}/${id}`);
    dispatch(deleteInfo({ id, type }));
    setToDelete(false);
  };

  const handleOpenDeleteModal = (id, type) => {
    setToDelete({
      id,
      actionType: type,
    });
  };

  const additionalSection = [
    {
      title: "Main Page",
      type: "mainpage",
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
    },
    {
      title: "Список Стран и Городов",
      type: "countries",
      id: 2,
      data: countries,
      setEnglish: (info) => dispatch(setCountriesEnglish(info)),
      setRussian: (info) => dispatch(setCountriesRussian(info)),
      setUzbek: (info) => dispatch(setCountriesUzbek(info)),
      setCode: (info) => dispatch(setCountriesCode(info)),
    },
    {
      title: "Чартерные рейсы",
      type: "charters",
      id: 8,
      data: charters,
      setEnglish: (info) => dispatch(setChartersEnglish(info)),
      setRussian: (info) => dispatch(setChartersRussian(info)),
      setUzbek: (info) => dispatch(setChartersUzbek(info)),
      setPhoneNumber: (info) => dispatch(setPhoneNumber(info)),
    },
    {
      title: "Актуальные направления",
      id: 3,
      type: "offers",
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
      type: "services",
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
    },
  ];

  const handleOpenModal = ({ type, isCreation, id }) => {
    const getCorrectInfo = (language) => {
      switch (type) {
        case "mainpage":
          const mainPageDetails = mainpage.find((item) => item.id === id);
          return isCreation
            ? {
                title: "",
                photo: "",
              }
            : {
                title: mainPageDetails?.[`title_${language}`],
                photo: mainPageDetails?.photo_url,
              };
        case "offers":
          const offersDetails = offers.find((item) => item.id === id);
          return isCreation
            ? {
                title: "",
                description: "",
                destination: "",
                photo: "",
                price: "",
              }
            : {
                title: offersDetails?.[`title_${language}`],
                description: offersDetails?.[`description_${language}`],
                destination: offersDetails?.[`destination_${language}`],
                photo: offersDetails?.photo_url,
                price: offersDetails?.price,
              };
        case "services":
          const servicesDetails = services.find((item) => item.id === id);
          return isCreation
            ? {
                title: "",
                description: "",
                small_description: "",
                photo: "",
              }
            : {
                title: servicesDetails?.[`title_${language}`],
                description: servicesDetails?.[`description_${language}`],
                small_description:
                  servicesDetails?.[`small_description_${language}`],
                photo: servicesDetails?.icon,
              };
        case "countries":
          const countriesDetails = countries.find((item) => item.id === id);
          return isCreation
            ? {
                country: "",
                city: "",
                city_code: "",
              }
            : {
                country: countriesDetails?.[`country_${language}`],
                city: countriesDetails?.[`city_${language}`],
                city_code: countriesDetails?.city_code,
              };
        case "charters":
          const chartersDetails = charters.find((item) => item.id === id);
          return isCreation
            ? {
                from_city: "",
                to_city: "",
                phone_number: "",
              }
            : {
                from_city: chartersDetails?.[`from_city_${language}`],
                to_city: chartersDetails?.[`to_city_${language}`],
                phone_number: chartersDetails?.phone_number,
              };
        default:
          break;
      }
    };
    const {
      setEnglish,
      setRussian,
      setUzbek,
      setPhoto,
      setPrice,
      setCode,
      setPhoneNumber,
    } = additionalSection.find((item) => item.type === type);
    setEnglish(getCorrectInfo("en"));
    setRussian(getCorrectInfo("ru"));
    setUzbek(getCorrectInfo("uz"));
    setPhoto && setPhoto(getCorrectInfo("en")?.photo);
    setPrice && setPrice(getCorrectInfo("en")?.price);
    setCode && setCode(getCorrectInfo("en")?.city_code);
    setPhoneNumber && setPhoneNumber(getCorrectInfo("en")?.phone_number);
    isCreation
      ? setOpenModal({ actionType: type })
      : setOpenModal({ actionType: type, id });
  };

  return (
    <>
      <Wrapper>
        {additionalSection.map((item) => (
          <div key={item.id}>
            <ItemWrapper>
              <IconWrapper>
                <p>{item.title}</p>
                <AddText
                  onClick={() =>
                    handleOpenModal({
                      isCreation: true,
                      type: item.type,
                    })
                  }
                >
                  <PlusSign /> Cоздать
                </AddText>
              </IconWrapper>
              {item.data?.length !== 0 ? (
                item.data?.map((value) => (
                  <div key={value.id}>
                    <ItemTextWrapper>
                      {(value?.title_ru ||
                        value?.country_ru ||
                        value?.from_city_ru) && (
                        <ItemText>
                          {value?.title_ru ||
                            value?.country_ru ||
                            value?.from_city_ru}
                        </ItemText>
                      )}
                      {(value?.description_ru ||
                        value?.city_ru ||
                        value?.to_city_ru ||
                        value?.price) && (
                        <ItemText>
                          {value?.description_ru ||
                            value?.to_city_ru ||
                            value?.city_ru ||
                            `${value?.price} so'm`}
                        </ItemText>
                      )}
                      {(value?.phone_number || value?.city_code) && (
                        <ItemText>
                          {value?.phone_number || value?.city_code}
                        </ItemText>
                      )}
                      {value?.photo_url ? (
                        <img
                          src={value?.photo_url}
                          alt="wrapper"
                          width="100px"
                          height="50px"
                        />
                      ) : (
                        <SVG src={value?.icon} width="100px" height="50px" />
                      )}
                      <ItemActions>
                        <Edit
                          onClick={() =>
                            handleOpenModal({
                              id: value?.id,
                              type: item?.type,
                              isCreation: false,
                            })
                          }
                        />
                        <Delete
                          onClick={() =>
                            handleOpenDeleteModal(value?.id, item?.type)
                          }
                        />
                      </ItemActions>
                    </ItemTextWrapper>
                    {toDelete.id === value?.id &&
                      toDelete.actionType === item.type && (
                        <Modal>
                          <p>Вы уверены что хотите удалить?</p>
                          <ButtonsWrapper>
                            <StyledButton
                              onClick={() =>
                                handleDelete(value?.id, item?.type)
                              }
                            >
                              Да
                            </StyledButton>
                            <StyledButton onClick={() => setToDelete(false)}>
                              Нет
                            </StyledButton>
                          </ButtonsWrapper>
                        </Modal>
                      )}
                    {openModal.id === value?.id &&
                      openModal.actionType === item.type && (
                        <Creation
                          actionType={item.type}
                          onClose={() => setOpenModal(false)}
                          title="Изменить"
                          setEnglish={item?.setEnglish}
                          setRussian={item?.setRussian}
                          setUzbek={item?.setUzbek}
                          setFile={item?.setPhoto}
                          setPrice={item?.setPrice}
                          isEdition={true}
                          setCode={item?.setCode}
                          setPhoneNumber={item?.setPhoneNumber}
                        />
                      )}
                  </div>
                ))
              ) : (
                <ItemText>У вас нет информации для главной страницы</ItemText>
              )}
              {openModal.actionType === item?.type && (
                <Creation
                  actionType={item.type}
                  onClose={() => setOpenModal(false)}
                  title="Создать"
                  setEnglish={item?.setEnglish}
                  setRussian={item?.setRussian}
                  setUzbek={item?.setUzbek}
                  setFile={item?.setPhoto}
                  setPrice={item?.setPrice}
                  setCode={item?.setCode}
                  setPhoneNumber={item?.setPhoneNumber}
                  isEdition={false}
                />
              )}
            </ItemWrapper>
          </div>
        ))}
      </Wrapper>
    </>
  );
};
