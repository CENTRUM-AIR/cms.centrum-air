// FOR INLINE STYLES
export const styleMap = {
  CODE: {
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2,
  },
  CODEBLOCK: {
    fontFamily: '"fira-code", "monospace"',
    fontSize: "inherit",
    background: "#ffeff0",
    fontStyle: "italic",
    lineHeight: 1.5,
    padding: "0.3rem 0.5rem",
    borderRadius: " 0.2rem",
  },
  SUPERSCRIPT: {
    verticalAlign: "super",
    fontSize: "80%",
  },
  SUBSCRIPT: {
    verticalAlign: "sub",
    fontSize: "80%",
  },
};
export const myBlockStyleFn = (contentBlock) => {
  const type = contentBlock.getType();
  console.log(type);

  switch (type) {
    case "blockQuote":
      return "superFancyBlockquote";
    case "LINK":
      return "LINK";
    // case "leftAlign":
    //   return "leftAlign";
    // case "rightAlign":
    //   return "rightAlign";
    case "centerAlign":
      return "centerAlign";
    case "justifyAlign":
      return "justifyAlign";
    case "align-left":
      return "align-left";
    case "align-right":
      return "align-right";
    case "align-center":
      return "align-center";
    default:
      break;
  }
};

export const customInlineStyleFn = (style) => {
  const styles = style.toJS();
  return styles.reduce(
    (styleMap, styleName) =>
      styleName.startsWith("color-")
        ? { color: styleName.split("color-")[1] }
        : styleMap,
    {}
  );
};
