import React from "react";
import { StyledIframe } from "./styled";

export const PdfLoader = ({ url }) => {
  return (
    <StyledIframe
      title="PreviewOfPdf"
      src={url}
      width="100%"
      height="100%"
    />
  );
};
