import React, { useEffect, useState } from "react";
import {
  CompositeDecorator,
  ContentState,
  Editor,
  EditorState,
  convertToRaw,
} from "draft-js";
import Toolbar from "./toolbar";
import { StyledWrapper } from "./styled";
import { customInlineStyleFn, myBlockStyleFn, styleMap } from "./constants";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import "./styles.css";
// import addLinkPlugin from "./addLinkPlugin";

const styles = {
  root: {
    fontFamily: "'Georgia', serif",
    padding: 20,
    width: 400,
  },
  buttons: {
    marginBottom: 10,
  },
  urlInputContainer: {
    marginBottom: 10,
  },
  urlInput: {
    fontFamily: "'Georgia', serif",
    marginRight: 10,
    padding: 3,
  },
  editor: {
    border: "1px solid #ccc",
    cursor: "text",
    minHeight: 80,
    padding: 10,
  },
  button: {
    marginTop: 10,
    textAlign: "center",
  },
  link: {
    color: "#3b5998",
    textDecoration: "underline",
  },
};
function findLinkEntities(contentBlock, callback, contentState) {
  console.log("///////");

  contentBlock.findEntityRanges((character) => {
    const entityKey = character.getEntity();
    console.log(contentState.getEntity(entityKey).getType());

    return (
      entityKey !== null &&
      contentState.getEntity(entityKey).getType() === "LINK"
    );
  }, callback);
}

const Link = (props) => {
  console.log("fasdfasdf-------------------");
  const { url } = props.contentState.getEntity(props.entityKey).getData();
  return (
    <a href={url} style={styles.link}>
      {props.children}
    </a>
  );
};
export const TextEditor = ({ placeholder, onChange, changeStatus, value }) => {
  const decorator = new CompositeDecorator([
    {
      strategy: findLinkEntities,
      component: Link,
    },
  ]);

  const [editorState, setEditorState] = useState(
    EditorState.createEmpty(decorator)
  );
  // const plugins = [addLinkPlugin];
  useEffect(() => {
    if (changeStatus && value) {
      const blocksFromHTML = htmlToDraft(value);
      const state = ContentState.createFromBlockArray(
        blocksFromHTML.contentBlocks,
        blocksFromHTML.entityMap
      );
      setEditorState(EditorState.createWithContent(state));
    } else {
      setEditorState(EditorState.createEmpty());
    }
  }, [changeStatus]);

  const handleChange = (newState) => {
    setEditorState(newState);
    onChange(draftToHtml(convertToRaw(newState.getCurrentContent())));
  };

  const editor = React.useRef(null);

  const focusEditor = () => editor.current.focus();

  return (
    <StyledWrapper onClick={focusEditor}>
      <Toolbar
        onChange={onChange}
        editorState={editorState}
        setEditorState={setEditorState}
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
  );
};
