import React, { useEffect, useState } from "react";
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
import { Modal } from "../../components/Modal";
import { StyledButton } from "../../shared_styled";
import { getUser } from "../../store";
import api from "../../utils/api";

export const Additional = () => {
  const { login: authLogin } = useSelector(getUser);
  const dispatch = useDispatch();
  const [mainPage, setMainPage] = useState([]);
  const [specialOffers, setSpecialOffers] = useState([]);
  const [services, setServices] = useState([]);
  const [openModal, setOpenModal] = useState({
    actionType: "",
    id: "",
  });
  const [toDelete, setToDelete] = useState("");
  useEffect(() => {
    console.log(authLogin);
    if (
      (mainPage.length === 0 ||
        specialOffers.length === 0 ||
        services.length === 0) &&
      authLogin
    ) {
      api.get(`/mainpage`).then((res) => setMainPage(res.data));
      api.get(`/offers`).then((res) => setSpecialOffers(res.data));
      api.get(`/services`).then((res) => setServices(res.data));
    }
  }, [authLogin]);

  const handleDelete = async (id, type) => {
    await api.delete(`/${type}/${id}`);
    window.location.reload();
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
      onClick: () => setOpenModal(""),
      data: mainPage,
      smallDesc: false,
      desc: false,
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
      type: "simple",
      id: 2,
      onClick: () => setOpenModal(""),
      data: [],
      smallDesc: false,
      desc: false,
    },
    {
      title: "Актуальные направления",
      id: 3,
      type: "offers",
      onClick: () => setOpenModal(""),
      isTextArea: true,
      data: specialOffers,
      smallDesc: false,
      destination: true,
      price: true,
      desc: true,
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
      onClick: () => setOpenModal(""),
      isTextArea: true,
      data: [],
      smallDesc: false,
      desc: false,
    },
    {
      title: "Контакты",
      id: 5,
      type: "simple",
      onClick: () => setOpenModal(""),
      data: [],
      smallDesc: false,
      desc: false,
    },
    {
      title: "Доп услуги",
      id: 7,
      type: "services",
      onClick: () => setOpenModal(""),
      data: services,
      smallDesc: true,
      desc: true,
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
      fileType: ".svg",
    },
  ];

  const handleOpenModal = ({ type, isCreation, id }) => {
    const getCorrectInfo = (language) => {
      switch (type) {
        case "mainpage":
          const mainPageDetails = mainPage.find((item) => item.id === id);
          return isCreation
            ? {
                title: "",
                photo: "",
              }
            : {
                title: mainPageDetails?.[language],
                photo: mainPageDetails?.photo_url,
              };
        case "offers":
          const offersDetails = specialOffers.find((item) => item.id === id);
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
        default:
          break;
      }
    };
    const { setEnglish, setRussian, setUzbek, setPhoto, setPrice } =
      additionalSection.find((item) => item.type === type);
    setEnglish(getCorrectInfo("en"));
    setRussian(getCorrectInfo("ru"));
    setUzbek(getCorrectInfo("uz"));
    setPhoto && setPhoto(getCorrectInfo("en")?.photo);
    setPrice && setPrice(getCorrectInfo("en")?.price);
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
                      <ItemText>{value?.title_ru || value?.ru}</ItemText>
                      {value?.description_ru && (
                        <ItemText desc="true">{value?.description_ru}</ItemText>
                      )}
                      {value?.photo_url ? (
                        <img
                          src={value?.photo_url}
                          alt="wrapper"
                          width="100px"
                        />
                      ) : (
                        <SVG src={value?.icon} width="100px" />
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
                          onClose={item.onClick}
                          title="Изменить"
                          setEnglish={item?.setEnglish}
                          setRussian={item?.setRussian}
                          setUzbek={item?.setUzbek}
                          setFile={item?.setPhoto}
                          setPrice={item?.setPrice}
                          isEdition={true}
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
                  onClose={item.onClick}
                  title="Создать"
                  setEnglish={item?.setEnglish}
                  setRussian={item?.setRussian}
                  setUzbek={item?.setUzbek}
                  setFile={item?.setPhoto}
                  setPrice={item?.setPrice}
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
