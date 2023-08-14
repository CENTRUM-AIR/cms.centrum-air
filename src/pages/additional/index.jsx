import React, { useEffect, useState } from "react";
import { AddText, IconWrapper, ItemText, ItemTextWrapper, ItemWrapper, Wrapper } from "./styled";
import { ReactComponent as PlusSign } from "../../icons/plus-sign.svg";
import { Creation } from "../../components/creation";

export const Additional = () => {
  const [data, setData] = useState([]);
  const [mainPage, setMainPage] = useState([]);
  // const [countries, setCountries] = useState(null);
  const [specialOffers, setSpecialOffers] = useState([]);
  // const [rules, setRules] = useState(null);
  // const [contacts, setContacts] = useState(null);
  // const [directions, setDirections] = useState(null);
  const [services, setServices] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  useEffect(() => {
    fetch("https://node.centrum-air.com/mainpage").then((res) => {
      res.json().then((data) => setMainPage(data));
    });
    // fetch("https://node.centrum-air.com/offers").then((res) => {
    //   res.json().then((data) => setSpecialOffers(data));
    // });
    fetch("https://node.centrum-air.com/services").then((res) => {
      res.json().then((data) => setServices(data));
    });
    // fetch("https://node.centrum-air.com/mainpage").then((res) => {
    //   res.json().then((data) => setMainPage(data));
    // });
    // fetch("https://node.centrum-air.com/mainpage").then((res) => {
    //   res.json().then((data) => setMainPage(data));
    // });
  }, []);

  const handleClick = () => setOpenModal(!openModal);
  const AdditionalSection = [
    {
      title: "Main Page",
      id: 1,
      onClick: handleClick,
      data: mainPage,
    },
    {
      title: "Список Стран и Городов",
      id: 2,
      onClick: handleClick,
      data: data,
    },
    {
      title: "Cпециальные предложения",
      id: 3,
      onClick: handleClick,
      isTextArea: true,
      data: specialOffers,
    },
    {
      title: "Правила и условия",
      id: 4,
      onClick: handleClick,
      isTextArea: true,
      data: data,
    },
    {
      title: "Контакты",
      id: 5,
      onClick: handleClick,
      data: data,
    },
    {
      title: "Актуальные направления",
      id: 6,
      onClick: handleClick,
      data: data,
    },
    {
      title: "Доп услуги",
      id: 6,
      onClick: handleClick,
      data: services,
    },
  ];

  return (
    <>
      <Wrapper>
        {AdditionalSection.map((item) => (
          <>
            <ItemWrapper>
              <IconWrapper>
                <p>{item.title}</p>
                <AddText onClick={item.onClick}>
                  <PlusSign /> Cоздать
                </AddText>
              </IconWrapper>
              {item.data?.length !== 0 ? (
                item.data?.map((item) => 
                <ItemTextWrapper>

                <ItemText>{item?.title_ru}</ItemText>
                <ItemText>{item?.description_ru}</ItemText>
                </ItemTextWrapper>
                )
              ) : (
                <ItemText>У вас нет информации для главной страницы</ItemText>
              )}
            </ItemWrapper>
            {openModal && (
              <Creation
                isTextArea={true}
                smallDesc={true}
                onClose={item.onClick}
                title="Изменить главную страницу"
              />
            )}
          </>
        ))}
      </Wrapper>
    </>
  );
};
