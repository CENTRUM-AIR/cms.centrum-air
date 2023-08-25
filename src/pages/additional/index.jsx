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
import { useDispatch } from "react-redux";
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
import { SERVER } from "../../constants";

export const Additional = () => {
  const dispatch = useDispatch();
  const [mainPage, setMainPage] = useState([]);
  const [specialOffers, setSpecialOffers] = useState([]);
  const [services, setServices] = useState([]);
  const [openModal, setOpenModal] = useState("");
  const [isEdition, setIsEdition] = useState(false);
  const [toDelete, setToDelete] = useState("");
  useEffect(() => {
    fetch(`${SERVER}/mainpage`).then((res) => {
      res.json().then((data) => setMainPage(data));
    });
    fetch(`${SERVER}/offers`).then((res) => {
      res.json().then((data) => setSpecialOffers(data));
    });
    fetch(`${SERVER}/services`).then((res) => {
      res.json().then((data) => setServices(data));
    });
  }, []);

  const handleDelete = async (id, type) => {
    await fetch(`${SERVER}/${type}/${id}`, {
      method: "DELETE",
    });
    window.location.reload();
  };

  const handleOpenDeleteModal = (id) => {
    setToDelete(id);
  };

  const handleCreate = (type) => {
    let empty;
    switch (type) {
      case "mainpage":
        dispatch(setTitleEnglish({ title: "" }));
        dispatch(setTitleRussian({ title: "" }));
        dispatch(setTitleUzbek({ title: "" }));
        dispatch(setPhoto({ photo: "" }));
        setOpenModal("mainpage");
        break;
      case "offers":
        empty = {
          title: "",
          description: "",
          destination: "",
        };
        dispatch(setDestinationEnglish(empty));
        dispatch(setDestinationRussian(empty));
        dispatch(setDestinationUzbek(empty));
        dispatch(setDestinationPhoto({ photo: "" }));
        dispatch(setPrice({ price: "" }));
        setOpenModal("offers");
        break;
      case "services":
        empty = {
          title: "",
          description: "",
          small_description: "",
        };
        dispatch(setServiceEnglish(empty));
        dispatch(setServiceRussian(empty));
        dispatch(setServiceUzbek(empty));
        dispatch(setServiceIcon({ photo: "" }));
        setOpenModal("services");
        break;

      default:
        break;
    }
  };
  const AdditionalSection = [
    {
      title: "Main Page",
      type: "mainpage",
      id: 1,
      onClick: () => setOpenModal(""),
      data: mainPage,
      smallDesc: false,
      desc: false,
      setEnglish: (title) => {
        dispatch(setTitleEnglish({ title }));
      },
      setRussian: (title) => {
        dispatch(setTitleRussian({ title }));
      },
      setUzbek: (title) => {
        dispatch(setTitleUzbek({ title }));
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

  const handleEdit = (id, type) => {
    let itemInfo;
    switch (type) {
      case "mainpage":
        itemInfo = mainPage.find((item) => item.id === id);
        dispatch(setTitleEnglish({ title: itemInfo?.en }));
        dispatch(setTitleRussian({ title: itemInfo?.ru }));
        dispatch(setTitleUzbek({ title: itemInfo?.uz }));
        dispatch(setPhoto({ photo: itemInfo?.photo_url }));
        setIsEdition(true);
        setOpenModal(id);
        break;
      case "offers":
        itemInfo = specialOffers.find((item) => item.id === id);
        dispatch(
          setDestinationEnglish({
            title: itemInfo?.title_en,
            description: itemInfo?.description_en,
            destination: itemInfo?.destination_en,
          })
        );
        dispatch(
          setDestinationRussian({
            title: itemInfo?.title_ru,
            description: itemInfo?.description_ru,
            destination: itemInfo?.destination_ru,
          })
        );
        dispatch(
          setDestinationUzbek({
            title: itemInfo?.title_uz,
            description: itemInfo?.description_uz,
            destination: itemInfo?.destination_uz,
          })
        );
        dispatch(setDestinationPhoto({ photo: itemInfo?.photo_url }));
        dispatch(setPrice({ price: itemInfo?.price }));
        setIsEdition(true);
        setOpenModal(id);
        break;
      case "services":
        itemInfo = services.find((item) => item.id === id);
        dispatch(
          setServiceEnglish({
            title: itemInfo?.title_en,
            description: itemInfo?.description_en,
            small_description: itemInfo?.small_description_en,
          })
        );
        dispatch(
          setServiceRussian({
            title: itemInfo?.title_ru,
            description: itemInfo?.description_ru,
            small_description: itemInfo?.small_description_ru,
          })
        );
        dispatch(
          setServiceUzbek({
            title: itemInfo?.title_uz,
            description: itemInfo?.description_uz,
            small_description: itemInfo?.small_description_uz,
          })
        );
        dispatch(setServiceIcon({ photo: itemInfo?.icon }));
        break;
      default:
        break;
    }
  };

  return (
    <>
      <Wrapper>
        {AdditionalSection.map((item) => (
          <div key={item.id}>
            <ItemWrapper>
              <IconWrapper>
                <p>{item.title}</p>
                <AddText onClick={() => handleCreate(item.type)}>
                  <PlusSign /> Cоздать
                </AddText>
              </IconWrapper>
              {item.data?.length !== 0 ? (
                item.data?.map((value) => (
                  <div key={value.id}>
                    <ItemTextWrapper>
                      <ItemText>{value?.title_ru || value?.ru}</ItemText>
                      <ItemText desc="true">{value?.description_ru}</ItemText>
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
                          onClick={() => handleEdit(value?.id, item?.type)}
                        />
                        <Delete
                          onClick={() => handleOpenDeleteModal(value?.id)}
                        />
                      </ItemActions>
                    </ItemTextWrapper>
                    {toDelete === value?.id && (
                      <Modal>
                        <p>Вы уверены что хотите удалить?</p>
                        <ButtonsWrapper>
                          <StyledButton
                            onClick={() => handleDelete(value?.id, item?.type)}
                          >
                            Да
                          </StyledButton>
                          <StyledButton onClick={() => setToDelete(false)}>
                            Нет
                          </StyledButton>
                        </ButtonsWrapper>
                      </Modal>
                    )}
                    {openModal === value?.id && (
                      <Creation
                        actionType={item.type}
                        isTextArea={item.desc}
                        smallDesc={item?.smallDesc}
                        onClose={item.onClick}
                        title="Изменить"
                        setEnglish={item?.setEnglish}
                        setRussian={item?.setRussian}
                        setUzbek={item?.setUzbek}
                        setFile={item?.setPhoto}
                        isEdition={isEdition}
                        id={value?.id}
                        showPrice={item?.price}
                        showDestination={item?.destination}
                        setPrice={item?.setPrice}
                      />
                    )}
                  </div>
                ))
              ) : (
                <ItemText>У вас нет информации для главной страницы</ItemText>
              )}
              {openModal === item?.type && (
                <Creation
                  actionType={item.type}
                  isTextArea={item.desc}
                  smallDesc={item?.smallDesc}
                  onClose={item.onClick}
                  title="Создать"
                  setEnglish={item?.setEnglish}
                  setRussian={item?.setRussian}
                  setUzbek={item?.setUzbek}
                  setFile={item?.setPhoto}
                  showPrice={item?.price}
                  showDestination={item?.destination}
                  setPrice={item?.setPrice}
                  fileType={item?.fileType}
                />
              )}
            </ItemWrapper>
          </div>
        ))}
      </Wrapper>
    </>
  );
};
