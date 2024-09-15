import React from "react";
import { Modal } from "../Modal";
import {
  ButtonsWrapper,
  Title,
  UrlInput,
  UrlInputContainer,
  Wrapper,
} from "./styled";
import { StyledButton, StyledRedButton } from "../../shared_styled";
import { EditorState, RichUtils } from "draft-js";

export const LinkModal = ({
  setOpenLinkModal,
  urlRef,
  showURLInput,
  setUrlValue,
  urlValue,
  editorState,
  setShowURLInput,
  setEditorState,
  editor,
}) => {
  const confirmLink = (e) => {
    e.preventDefault();
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      "LINK",
      "MUTABLE",
      { url: urlValue }
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(editorState, {
      currentContent: contentStateWithEntity,
    });

    setEditorState(
      RichUtils.toggleLink(
        newEditorState,
        newEditorState.getSelection(),
        entityKey
      )
    );
    setShowURLInput(false);
    setUrlValue("");
    setOpenLinkModal(false);
    setTimeout(() => editor.current.focus(), 0);
  };
  const removeLink = (e) => {
    e.preventDefault();
    const selection = editorState.getSelection();
    if (!selection.isCollapsed()) {
      setEditorState(RichUtils.toggleLink(editorState, selection, null));
    }
    setOpenLinkModal(false);
  };

  let urlInput;
  if (showURLInput) {
    urlInput = (
      <UrlInputContainer>
        <UrlInput
          onChange={(e) => setUrlValue(e.target.value)}
          ref={urlRef}
          type="text"
          value={urlValue}
        />
      </UrlInputContainer>
    );
  }

  return (
    <Modal onClose={() => setOpenLinkModal(false)}>
      <Wrapper>
        <Title>Create Link</Title>
        {urlInput}
        <ButtonsWrapper>
          {showURLInput && (
            <StyledButton onMouseDown={confirmLink}>Confirm</StyledButton>
          )}
          <StyledRedButton onMouseDown={removeLink}>
            Remove Link
          </StyledRedButton>
        </ButtonsWrapper>
      </Wrapper>
    </Modal>
  );
};
