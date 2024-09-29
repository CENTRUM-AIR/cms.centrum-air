import React, { useEffect, useState } from "react";
import {
  MdFormatBold,
  MdFormatItalic,
  MdFormatUnderlined,
  MdFormatStrikethrough,
  MdOutlineSuperscript,
  MdOutlineSubscript,
} from "react-icons/md";
import { FaCode } from "react-icons/fa6";
import { GoListUnordered } from "react-icons/go";
import { GoListOrdered } from "react-icons/go";
import { GrMonospace } from "react-icons/gr";
import { AiOutlineAlignRight, AiOutlineLink } from "react-icons/ai";
import { AiOutlineAlignLeft } from "react-icons/ai";
import { AiOutlineAlignCenter } from "react-icons/ai";
import { IoIosColorPalette } from "react-icons/io";
import { RichUtils } from "draft-js";
import { PickerWrapper, StyledButton } from "./styled";

const Toolbar = ({
  editorState,
  setEditorState,
  onChange,
  openLinkModal,
  setOpenLinkModal,
  urlRef,
  setUrlValue,
  setShowURLInput,
  openColorPicker,
  setOpenColorPicker,
  handleButtonClick,
  buttonRef,
}) => {
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
  const promptForLink = (e) => {
    const selection = editorState.getSelection();
    console.log("1111", selection.isCollapsed());

    if (!selection.isCollapsed()) {
      console.log("2222");
      const contentState = editorState.getCurrentContent();
      const startKey = selection.getStartKey();
      const startOffset = selection.getStartOffset();
      const blockWithLinkAtBeginning = contentState.getBlockForKey(startKey);
      const linkKey = blockWithLinkAtBeginning.getEntityAt(startOffset);
      console.log("3333");
      let url = "";
      if (linkKey) {
        console.log("4444");

        const linkInstance = contentState.getEntity(linkKey);
        url = linkInstance.getData().url;
      }
      console.log("5555");
      setShowURLInput(true);
      setUrlValue(url);
      setTimeout(() => urlRef.current.focus(), 0);
    }
  };

  useEffect(() => {
    if (openLinkModal) {
      promptForLink();
    }
  }, [openLinkModal]);
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
        <div>
          <StyledButton
            onClick={() => {
              !editorState.getSelection().isCollapsed() &&
                setOpenLinkModal(true);
            }}
          >
            <AiOutlineLink />
          </StyledButton>
        </div>
        <PickerWrapper>
          <StyledButton
            onMouseDown={(e) => e.preventDefault()}
            ref={buttonRef}
            onClick={handleButtonClick}
          >
            <IoIosColorPalette />
          </StyledButton>
          {/* {openColorPicker && (
            <BlockPicker
              color={currentColor}
              onChangeComplete={handleChangeComplete}
            />
          )} */}
        </PickerWrapper>
      </div>
    </>
  );
};

export default Toolbar;
