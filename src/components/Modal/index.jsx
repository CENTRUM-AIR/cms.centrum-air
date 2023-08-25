import React from "react";
import { MainWrapper, ModalBackdrop, Wrapper } from "./styled";

export const Modal = ({ onClose, children }) => {
  return (
    <MainWrapper>
      <Wrapper>{children}</Wrapper>
      <ModalBackdrop zIndex="14" onClick={onClose} />
    </MainWrapper>
  );
};
