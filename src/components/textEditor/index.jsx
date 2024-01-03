import React, { useEffect, useState } from "react";
import { ContentState, Editor, EditorState, convertToRaw } from "draft-js";
import Toolbar from "./toolbar";
import { StyledWrapper } from "./styled";
import { customInlineStyleFn, myBlockStyleFn, styleMap } from "./constants";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";

export const TextEditor = ({ placeholder, onChange, changeStatus, value }) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  useEffect(() => {
    if (changeStatus && value) {
      const blocksFromHTML = htmlToDraft(value);
      const state = ContentState.createFromBlockArray(
        blocksFromHTML.contentBlocks,
        blocksFromHTML.entityMap
      );
      setEditorState(EditorState.createWithContent(state));
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
