import React, { useState } from "react";
import { HeaderWrapper } from "./styled";
import { Option, StyledInput } from "../../shared_styled";
import { CreateUser } from "../creation/createUser";
import { setNewUser } from "../../store/create-user";
import { useDispatch } from "react-redux";

export const ManagementHeader = () => {
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => {
    dispatch(
      setNewUser({
        login: "",
        role: "",
      })
    );
    setOpenModal(true);
  };
  return (
    <HeaderWrapper>
      <Option>filters</Option>
      <Option onClick={handleOpenModal}>create user</Option>
      <StyledInput width="100%" placeholder="Поиск Пользователя" bc="#FFF" />
      {openModal && <CreateUser onClose={() => setOpenModal(false)} />}
    </HeaderWrapper>
  );
};
