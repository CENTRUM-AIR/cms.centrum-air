import React, { useState } from "react";
import { HeaderWrapper } from "./styled";
import { Option, StyledInput } from "../../shared_styled";
import { CreateUser } from "../creation/createUser";
import { setNewUser } from "../../store/create-user";
import { useDispatch } from "react-redux";

export const ManagementHeader = ({ setSearch, search }) => {
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
      <Option onClick={handleOpenModal}>Создать Юзера</Option>
      <StyledInput
        width="100%"
        placeholder="Поиск Пользователя"
        bc="#FFF"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {openModal && <CreateUser onClose={() => setOpenModal(false)} />}
    </HeaderWrapper>
  );
};
