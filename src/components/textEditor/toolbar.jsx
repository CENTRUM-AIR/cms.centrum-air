import React, { useCallback, useRef, useState } from "react";
import {
  MdFormatBold,
  MdFormatItalic,
  MdFormatUnderlined,
  MdFormatStrikethrough,
  MdOutlineSuperscript,
  MdOutlineSubscript,
} from "react-icons/md";
import { FaCode } from "react-icons/fa6";
// import { CiTextAlignLeft } from "react-icons/ci";
import { GoListUnordered } from "react-icons/go";
import { GoListOrdered } from "react-icons/go";
import { GrMonospace } from "react-icons/gr";
import { AiOutlineAlignRight } from "react-icons/ai";
import { AiOutlineAlignLeft } from "react-icons/ai";
import { AiOutlineAlignCenter } from "react-icons/ai";

// import { CiTextAlignCenter } from "react-icons/ci";
// import { CiTextAlignRight } from "react-icons/ci";
import { IoIosColorPalette } from "react-icons/io";
import {
  CompositeDecorator,
  EditorState,
  RichUtils,
  convertToRaw,
} from "draft-js";
import { PickerWrapper, StyledButton } from "./styled";
import { BlockPicker } from "react-color";
import draftToHtml from "draftjs-to-html";
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

// export function findLinkEntities(contentBlock, callback, contentState) {
//   console.log("///////");

//   contentBlock.findEntityRanges((character) => {
//     const entityKey = character.getEntity();
//     console.log(contentState.getEntity(entityKey).getType());

//     return (
//       entityKey !== null &&
//       contentState.getEntity(entityKey).getType() === "LINK"
//     );
//   }, callback);
// }

// export const Link = (props) => {
//   console.log("fasdfasdf-------------------");
//   const { url } = props.contentState.getEntity(props.entityKey).getData();
//   return (
//     <a href={url} style={styles.link}>
//       {props.children}
//     </a>
//   );
// };
const Toolbar = ({ editorState, setEditorState, onChange }) => {
  const [showURLInput, setShowURLInput] = useState(false);
  const [urlValue, setUrlValue] = useState("");

  const urlRef = useRef(null);

  const tools = [
    {
      label: "bold",
      style: "BOLD",
      icon: <MdFormatBold />,
      method: "inline",
    },
    {
      label: "italic",
      style: "ITALIC",
      icon: <MdFormatItalic />,
      method: "inline",
    },
    {
      label: "underline",
      style: "UNDERLINE",
      icon: <MdFormatUnderlined />,
      method: "inline",
    },
    {
      label: "strike-through",
      style: "STRIKETHROUGH",
      icon: <MdFormatStrikethrough />,
      method: "inline",
    },
    {
      label: "Superscript",
      style: "SUPERSCRIPT",
      icon: <MdOutlineSuperscript />,
      method: "inline",
    },
    {
      label: "Subscript",
      style: "SUBSCRIPT",
      icon: <MdOutlineSubscript />,
      method: "inline",
    },
    {
      label: "Monospace",
      style: "CODE",
      icon: <GrMonospace />,
      method: "inline",
    },
    {
      label: "Unordered-List",
      style: "unordered-list-item",
      method: "block",
      icon: <GoListUnordered />,
    },
    {
      label: "Ordered-List",
      style: "ordered-list-item",
      method: "block",
      icon: <GoListOrdered />,
    },
    {
      label: "Code Block",
      style: "CODEBLOCK",
      icon: <FaCode />,
      method: "inline",
    },
    {
      label: "Left",
      style: "align-left",
      icon: <AiOutlineAlignLeft />,
      method: "block",
    },
    {
      label: "Center",
      style: "align-center",
      icon: <AiOutlineAlignCenter />,
      method: "block",
    },
    {
      label: "Right",
      style: "align-right",
      icon: <AiOutlineAlignRight />,
      method: "block",
    },
    { label: "H1", style: "header-one", method: "block" },
    { label: "H2", style: "header-two", method: "block" },
    { label: "H3", style: "header-three", method: "block" },
    { label: "H4", style: "header-four", method: "block" },
    { label: "H5", style: "header-five", method: "block" },
    { label: "H6", style: "header-six", method: "block" },
  ];
  const [openColorPicker, setOpenColorPicker] = useState(false);
  const [currentColor, setCurrentColor] = useState("#000");

  const handleColorPicker = () => setOpenColorPicker(!openColorPicker);
  const handleChangeComplete = (color, e) => {
    setCurrentColor(color.hex);
    e.preventDefault();
    const currentStyles = editorState.getCurrentInlineStyle().toJS();
    const nextEditorState = [...currentStyles, "color-" + color.hex].reduce(
      (state, style) =>
        style.startsWith("color-")
          ? RichUtils.toggleInlineStyle(state, style)
          : state,
      editorState
    );
    onChange(draftToHtml(convertToRaw(nextEditorState.getCurrentContent())));
    setEditorState(nextEditorState);
  };

  const applyStyle = (e, style, method) => {
    e.preventDefault();
    method === "block"
      ? setEditorState(RichUtils.toggleBlockType(editorState, style))
      : setEditorState(RichUtils.toggleInlineStyle(editorState, style));
  };

  const isActive = (style, method) => {
    if (method === "block") {
      const selection = editorState.getSelection();
      const blockType = editorState
        .getCurrentContent()
        .getBlockForKey(selection.getStartKey())
        .getType();
      return blockType === style;
    } else {
      const currentStyle = editorState.getCurrentInlineStyle();
      return currentStyle.has(style);
    }
  };
  // const onAddLink = useCallback(() => {
  //   const selection = editorState.getSelection();
  //   const link = window.prompt("Paste the link -");
  //   if (!link) {
  //     onChange(RichUtils.toggleLink(editorState, selection, null));
  //     return "handled";
  //   }
  //   const content = editorState.getCurrentContent();
  //   const contentWithEntity = content.createEntity("LINK", "MUTABLE", {
  //     url: link,
  //   });
  //   const newEditorState = EditorState.push(
  //     editorState,
  //     contentWithEntity,
  //     "create-entity"
  //   );
  //   const entityKey = contentWithEntity.getLastCreatedEntityKey();
  //   onChange(RichUtils.toggleLink(newEditorState, selection, entityKey));
  //   return "handled";
  // }, [editorState, onChange]);

  const onURLChange = (e) => setUrlValue(e.target.value);

  const promptForLink = (e) => {
    e.preventDefault();
    const selection = editorState.getSelection();
    console.log(editorState.getSelection());

    if (!selection.isCollapsed()) {
      const contentState = editorState.getCurrentContent();
      const startKey = selection.getStartKey();
      const startOffset = selection.getStartOffset();
      const blockWithLinkAtBeginning = contentState.getBlockForKey(startKey);
      const linkKey = blockWithLinkAtBeginning.getEntityAt(startOffset);
      let url = "";
      if (linkKey) {
        const linkInstance = contentState.getEntity(linkKey);
        url = linkInstance.getData().url;
      }
      setUrlValue(url);
      setShowURLInput(true);
      // setTimeout(() => urlRef.current.focus(), 0);
    }
  };

  const confirmLink = (e) => {
    e.preventDefault();
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      "LINK",
      "MUTABLE",
      {
        url: urlValue,
      }
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    let nextEditorState = EditorState.set(editorState, {
      currentContent: contentStateWithEntity,
    });
    nextEditorState = RichUtils.toggleLink(
      nextEditorState,
      nextEditorState.getSelection(),
      entityKey
    );
    setEditorState(nextEditorState);
    console.log(draftToHtml(convertToRaw(nextEditorState.getCurrentContent())));

    setShowURLInput(false);
    setUrlValue("");
    // setTimeout(() => focusEditor(), 0);
  };

  const removeLink = (e) => {
    e.preventDefault();
    const selection = editorState.getSelection();
    if (!selection.isCollapsed()) {
      setEditorState(RichUtils.toggleLink(editorState, selection, null));
    }
  };

  // const onLinkInputKeyDown = (e) => {
  //   if (e.which === 13) {
  //     confirmLink(e);
  //   }
  // };

  let urlInput;
  if (showURLInput) {
    urlInput = (
      <div style={styles.urlInputContainer}>
        <input
          onChange={onURLChange}
          ref={urlRef}
          style={styles.urlInput}
          type="text"
          value={urlValue}
          // onKeyDown={onLinkInputKeyDown}
        />
        <button onMouseDown={confirmLink}> Confirm </button>
      </div>
    );
  }

  return (
    <>
      <div style={{ display: "flex", gap: "4px", flexWrap: "wrap" }}>
        {tools.map((item, idx) => (
          <StyledButton
            active={isActive(item.style, item.method) ? "yes" : undefined}
            key={`${item.label}-${idx}`}
            title={item.label}
            onClick={(e) => applyStyle(e, item.style, item.method)}
            onMouseDown={(e) => e.preventDefault()}
          >
            {item.icon || item.label}
          </StyledButton>
        ))}
        {/* <button id="link_url" onClick={onAddLink} className="add-link">
          <i className="material-icons">attach_file</i>
        </button> */}
        <div style={styles.buttons}>
          <button onMouseDown={promptForLink} style={{ marginRight: 10 }}>
            Add Link
          </button>
          <button onMouseDown={removeLink}>Remove Link</button>
        </div>

        {urlInput}

        <PickerWrapper>
          <StyledButton
            onMouseDown={(e) => e.preventDefault()}
            onClick={handleColorPicker}
          >
            <IoIosColorPalette />
          </StyledButton>
          {openColorPicker && (
            <BlockPicker
              color={currentColor}
              onChangeComplete={handleChangeComplete}
            />
          )}
        </PickerWrapper>
      </div>
    </>
  );
};

export default Toolbar;
