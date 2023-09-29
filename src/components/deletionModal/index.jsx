import React from "react";
import { Modal } from "../Modal";
import { ButtonsWrapper } from "./styled";
import { StyledButton } from "../../shared_styled";

export const DeletionModal = ({ handleDelete, removeDelete }) => {
  const handleActionDelete = () => {
    try {
      handleDelete();
    } catch (e) {
      window.alert("Ошибка при удалении \n" + e);
    }
  };
  return (
    <Modal>
      <p>Вы уверены что хотите удалить?</p>
      <ButtonsWrapper>
        <StyledButton onClick={handleActionDelete}>Да</StyledButton>
        <StyledButton onClick={removeDelete}>Нет</StyledButton>
      </ButtonsWrapper>
    </Modal>
  );
};
