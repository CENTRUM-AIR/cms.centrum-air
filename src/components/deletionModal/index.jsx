import React from "react";
import { Modal } from "../Modal";
import { ButtonsWrapper } from "./styled";
import { StyledButton } from "../../shared_styled";

export const DeletionModal = ({ handleDelete, removeDelete }) => {
  return (
    <Modal>
      <p>Вы уверены что хотите удалить?</p>
      <ButtonsWrapper>
        <StyledButton onClick={handleDelete}>Да</StyledButton>
        <StyledButton onClick={removeDelete}>Нет</StyledButton>
      </ButtonsWrapper>
      
    </Modal>
  );
};
