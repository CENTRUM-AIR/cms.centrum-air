import React, { useState } from "react";
import { HeaderWrapper, Option } from "./styled";
import { StyledInput } from "../../shared_styled";
import { CreateUser } from "../creation/createUser";

export const ManagementHeader = () => {
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  return (
    <HeaderWrapper>
      <Option>filters</Option>
      <Option onClick={handleOpenModal}>create user</Option>
      <StyledInput placeholder="Поиск Пользователя" bc="#FFF" />
      {openModal && <CreateUser onClose={() => setOpenModal(false)} />}
    </HeaderWrapper>
  );
};
