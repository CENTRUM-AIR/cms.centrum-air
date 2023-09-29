import React, { useState } from "react";
import { ButtonWrapper, HeaderWrapper, SubHeaderWrapper } from "./styled";
import { Option, StyledButton, StyledInput } from "../../shared_styled";
import { Creation } from "../../components/creation";
import { NEWS } from "../../constants";
import { useDispatch } from "react-redux";
import {
  setNewsEnglish,
  setNewsPhoto,
  setNewsRussian,
  setNewsUzbek,
} from "../../store/create-news";
import { sendNews } from "../../store/send-api-info";

export const NewsHeader = ({ search, setSearch }) => {
  const [chosenNewsType, setChosenNewsType] = useState("published");
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();
  const handleOpenModal = () => {
    dispatch(
      setNewsEnglish({
        title: "",
        description: "",
        small_description: "",
      })
    );
    dispatch(
      setNewsRussian({
        title: "",
        description: "",
        small_description: "",
      })
    );
    dispatch(
      setNewsUzbek({
        title: "",
        description: "",
        small_description: "",
      })
    );
    dispatch(setNewsPhoto({ photo: "" }));
    setOpenModal(true);
  };
  const setEnglish = (info) => {
    dispatch(setNewsEnglish(info));
  };
  const setRussian = (info) => {
    dispatch(setNewsRussian(info));
  };
  const setUzbek = (info) => {
    dispatch(setNewsUzbek(info));
  };

  const setPhoto = (info) => {
    dispatch(setNewsPhoto(info));
  };
  const sendInfo = () => {
    dispatch(sendNews());
  };
  return (
    <>
      <HeaderWrapper>
        <ButtonWrapper>
          <StyledButton
            height="40px"
            onClick={() => setChosenNewsType("published")}
            secondary={chosenNewsType !== "published" ? "true" : undefined}
          >
            Опубликовано
          </StyledButton>
          <StyledButton
            onClick={() => setChosenNewsType("drafts")}
            height="40px"
            secondary={chosenNewsType !== "drafts" ? "true" : undefined}
          >
            Черновики
          </StyledButton>
        </ButtonWrapper>
        <SubHeaderWrapper>
          <Option onClick={handleOpenModal}>Создать новость</Option>
          <StyledInput
            width="100%"
            placeholder="Поиск"
            bc="#FFF"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </SubHeaderWrapper>
      </HeaderWrapper>
      {openModal && (
        <Creation
          sendInfo={sendInfo}
          setEnglish={setEnglish}
          setUzbek={setUzbek}
          setRussian={setRussian}
          setFile={setPhoto}
          actionType={NEWS}
          onClose={() => setOpenModal(false)}
          titleText="Создать новость"
        />
      )}
    </>
  );
};
