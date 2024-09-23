import React, { useEffect, useState } from "react";
import {
  CompositeDecorator,
  ContentState,
  Editor,
  EditorState,
  convertToRaw,
} from "draft-js";
import Toolbar from "./toolbar";
import { StyledWrapper, StylesLink } from "./styled";
import { customInlineStyleFn, myBlockStyleFn, styleMap } from "./constants";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import "./styles.css";
import { LinkModal } from "../addLink";

export const TextEditor = ({ placeholder, onChange, changeStatus, value }) => {
  const createEditorState = (contentState) => {
    return EditorState.createWithContent(contentState, decorator);
  };

  const [editorState, setEditorState] = useState(
    EditorState.createEmpty(decorator)
  );
  const [showURLInput, setShowURLInput] = useState(false);
  const [urlValue, setUrlValue] = useState("");

  useEffect(() => {
    if (changeStatus && value) {
      const blocksFromHTML = htmlToDraft(value);
      const state = ContentState.createFromBlockArray(
        blocksFromHTML.contentBlocks,
        blocksFromHTML.entityMap
      );
      setEditorState(createEditorState(state));
    } else {
      setEditorState(EditorState.createEmpty(decorator));
    }
  }, [changeStatus]);

  const handleChange = (newState) => {
    setEditorState(newState);
    onChange(draftToHtml(convertToRaw(newState.getCurrentContent())));
  };

  const urlRef = React.useRef(null);
  const editor = React.useRef(null);

  const focusEditor = () => editor.current.focus();
  const [openLinkModal, setOpenLinkModal] = useState(false);

  return (
    <>
      <StyledWrapper onClick={focusEditor}>
        <Toolbar
          onChange={onChange}
          editorState={editorState}
          setEditorState={setEditorState}
          urlRef={urlRef}
          showURLInput={showURLInput}
          setUrlValue={setUrlValue}
          urlValue={urlValue}
          setShowURLInput={setShowURLInput}
          editor={editor}
          openLinkModal={openLinkModal}
          setOpenLinkModal={setOpenLinkModal}
        />

        <Editor
          ref={editor}
          placeholder={placeholder}
          editorState={editorState}
          customStyleMap={styleMap}
          customStyleFn={customInlineStyleFn}
          blockStyleFn={myBlockStyleFn}
          onChange={handleChange}
        />
      </StyledWrapper>
      {openLinkModal && (
        <LinkModal
          urlRef={urlRef}
          showURLInput={showURLInput}
          setUrlValue={setUrlValue}
          urlValue={urlValue}
          editorState={editorState}
          setShowURLInput={setShowURLInput}
          setEditorState={setEditorState}
          editor={editor}
          openLinkModal={openLinkModal}
          setOpenLinkModal={setOpenLinkModal}
        />
      )}
    </>
  );
};

function findLinkEntities(contentBlock, callback, contentState) {
  contentBlock.findEntityRanges((character) => {
    const entityKey = character.getEntity();
    return (
      entityKey !== null &&
      contentState.getEntity(entityKey).getType() === "LINK"
    );
  }, callback);
}

const Link = (props) => {
  const { url } = props.contentState.getEntity(props.entityKey).getData();
  return <StylesLink href={url}>{props.children}</StylesLink>;
};

const decorator = new CompositeDecorator([
  {
    strategy: findLinkEntities,
    component: Link,
  },
]);
