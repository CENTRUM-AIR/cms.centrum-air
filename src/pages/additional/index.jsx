import React, { useEffect, useState } from "react";
import {
  AddText,
  IconWrapper,
  ItemActions,
  ItemText,
  ItemTextWrapper,
  ItemTitle,
  ItemWrapper,
  OpenerWrapper,
  SvgWrapper,
  Wrapper,
} from "./styled";
import { ReactComponent as PlusSign } from "../../icons/plus-sign.svg";
import { ReactComponent as Edit } from "../../icons/edit.svg";
import { ReactComponent as Delete } from "../../icons/delete.svg";
import { ReactComponent as Arrow } from "../../icons/arrow.svg";
import { Creation } from "../../components/creation";
import { useDispatch, useSelector } from "react-redux";
import { getAllInfo, getUser } from "../../store";
import api from "../../utils/api";
import { deleteInfo } from "../../store/get-api-info";
import SVG from "react-inlinesvg";
import Edition from "../../components/creation/edition";
import { useAdditionalInfo } from "./addtionalInfo";
import {
  CHARTERS,
  CONTENTMANAGER,
  COUNTRIES,
  MAINPAGE,
  OFFERS,
  SERVICES,
  SUPERADMIN,
} from "../../constants";
import { DeletionModal } from "../../components/deletionModal";
import { useNavigate } from "react-router-dom";

const CORRECT_ROLES = [SUPERADMIN, CONTENTMANAGER];

export const Additional = () => {
  const { mainpage, offers, countries, services, charters } =
    useSelector(getAllInfo);
  const navigate = useNavigate();
  const { role } = useSelector(getUser);
  const dispatch = useDispatch();
  const additionalInfo = useAdditionalInfo();
  const [isFolderOpen, setIsFolderOpen] = useState({
    offers: false,
    services: false,
    countries: false,
    charters: false,
    mainpage: false,
    news: false,
    rules: false,
    contacts: false,
  });
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

  const handleOpenModal = ({ type, isCreation, id }) => {
    const getCorrectInfo = (language) => {
      switch (type) {
        case MAINPAGE:
          const mainPageDetails = mainpage.find((item) => item.id === id);
          return isCreation
            ? {
                title: "",
                photo: "",
                color: "",
              }
            : {
                title: mainPageDetails?.[`title_${language}`],
                photo: mainPageDetails?.photo_url,
                color: mainPageDetails?.color,
              };
        case OFFERS:
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
        case SERVICES:
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
        case COUNTRIES:
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
        case CHARTERS:
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
      setColor,
      setPhoneNumber,
    } = additionalInfo.find((item) => item.type === type);
    setEnglish(getCorrectInfo("en"));
    setRussian(getCorrectInfo("ru"));
    setUzbek(getCorrectInfo("uz"));
    setPhoto && setPhoto({ photo: getCorrectInfo()?.photo });
    setPrice && setPrice({ price: getCorrectInfo()?.price });
    setCode && setCode({ city_code: getCorrectInfo()?.city_code });
    setColor && setColor(getCorrectInfo()?.color);
    setPhoneNumber &&
      setPhoneNumber({ phone_number: getCorrectInfo()?.phone_number });
    isCreation
      ? setOpenModal({ actionType: type })
      : setOpenModal({ actionType: type, id });
  };
  useEffect(() => {
    if (!CORRECT_ROLES.includes(role)) {
      navigate("/not-found");
    }
  }, [role, navigate]);

  const handleOpenFolder = (type) => {
    isFolderOpen[type]
      ? setIsFolderOpen((prev) => ({
          ...prev,
          [type]: !prev[type],
        }))
      : setIsFolderOpen((prev) => ({
          ...prev,
          [type]: true,
        }));
  };

  return (
    <>
      <Wrapper>
        {additionalInfo.map((item) => (
          <div key={item.id}>
            <ItemWrapper>
              <IconWrapper>
                <OpenerWrapper onClick={() => handleOpenFolder(item?.type)}>
                  <SvgWrapper deg={isFolderOpen[item?.type] ? "90" : "0"}>
                    <Arrow />
                  </SvgWrapper>
                  <ItemTitle>{item.title}</ItemTitle>
                </OpenerWrapper>
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
              {isFolderOpen[item?.type] && (
                <>
                  {item.data && item.data?.length !== 0 ? (
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
                            <SVG
                              src={value?.icon}
                              width="100px"
                              height="50px"
                            />
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
                            <DeletionModal
                              handleDelete={() =>
                                handleDelete(value?.id, item?.type)
                              }
                              removeDelete={() => setToDelete(false)}
                            />
                          )}
                        {openModal.id === value?.id &&
                          openModal.actionType === item.type && (
                            <Edition
                              actionType={item.type}
                              onClose={() => setOpenModal(false)}
                              titleText="Изменить"
                              isEdition={true}
                              setCode={item?.setCode}
                              setPhoneNumber={item?.setPhoneNumber}
                              itemId={value?.id}
                              sendInfo={item?.updateInfo}
                            />
                          )}
                      </div>
                    ))
                  ) : (
                    <ItemText>У вас нет информации для этого чаптера</ItemText>
                  )}
                </>
              )}
              {openModal.actionType === item?.type && !openModal.id && (
                <Creation
                  actionType={item.type}
                  onClose={() => setOpenModal(false)}
                  titleText="Создать"
                  setEnglish={item?.setEnglish}
                  setRussian={item?.setRussian}
                  setUzbek={item?.setUzbek}
                  setFile={item?.setPhoto}
                  setPrice={item?.setPrice}
                  setCode={item?.setCode}
                  setPhoneNumber={item?.setPhoneNumber}
                  sendInfo={item?.sendInfo}
                />
              )}
            </ItemWrapper>
          </div>
        ))}
      </Wrapper>
    </>
  );
};
