import React, { useState } from "react";
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
// import { CiTextAlignCenter } from "react-icons/ci";
// import { CiTextAlignRight } from "react-icons/ci";
import { IoIosColorPalette } from "react-icons/io";
import { RichUtils, convertToRaw } from "draft-js";
import { PickerWrapper, StyledButton } from "./styled";
import { BlockPicker } from "react-color";
import draftToHtml from "draftjs-to-html";

const Toolbar = ({ editorState, setEditorState, onChange }) => {
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
    // {
    //   label: "Left",
    //   style: "leftAlign",
    //   icon: <CiTextAlignLeft />,
    //   method: "block",
    // },
    // {
    //   label: "Center",
    //   style: "centerAlign",
    //   icon: <CiTextAlignCenter />,
    //   method: "block",
    // },
    // {
    //   label: "Right",
    //   style: "rightAlign",
    //   icon: <CiTextAlignRight />,
    //   method: "block",
    // },
    // { label: "H1", style: "header-one", method: "block" },
    // { label: "H2", style: "header-two", method: "block" },
    // { label: "H3", style: "header-three", method: "block" },
    // { label: "H4", style: "header-four", method: "block" },
    // { label: "H5", style: "header-five", method: "block" },
    // { label: "H6", style: "header-six", method: "block" },
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
