import React from "react";
import { Modal } from "../Modal";
import { ButtonsWrapper, Title, Wrapper } from "./styled";
import { StyledButton, StyledRedButton } from "../../shared_styled";

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
      <Wrapper>
        <Title>Вы уверены что хотите удалить?</Title>
        <ButtonsWrapper>
          <StyledRedButton onClick={handleActionDelete}>Да</StyledRedButton>
          <StyledButton onClick={removeDelete}>Нет</StyledButton>
        </ButtonsWrapper>
      </Wrapper>
    </Modal>
  );
};
