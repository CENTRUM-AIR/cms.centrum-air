import React, { useCallback, useEffect, useState } from "react";
import { ModalBackdrop } from "../creation/styled";
import { MainWrapper, Wrapper } from "./styled";
import { useDropzone } from "react-dropzone";

export const Dropzone = ({ onClose, setImage, fileType }) => {
  const [fileError, setFileError] = useState(false);

  const onDrop = useCallback((acceptedFiles) => {
    if (
      fileType &&
      !acceptedFiles[0].type.includes(fileType.replace(".", ""))
    ) {
      setFileError(true);
      return;
    }
    if (fileType === ".svg") {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const svgString = reader.result;
        const newIcon = svgString.replace(/"/g, "'").replace(/\n/g, "");
        setImage({
          photo: newIcon,
        });
      };
      reader.readAsText(acceptedFiles[0]);
    } else {
      setImage({
        photo: Object.assign(acceptedFiles[0], {
          preview: URL.createObjectURL(acceptedFiles[0]),
        }),
      });
    }
    onClose();
  }, []);

  useEffect(() => {
    if (fileError) {
      alert(`Неверный формат файла, допустимый формат: ${fileType}`);
    }
    setFileError(false);
  }, [fileError, fileType]);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <MainWrapper>
      <Wrapper {...getRootProps()}>
        <input {...getInputProps()} accept={fileType} />
        {isDragActive ? (
          <p>Перетащите файлы сюда...</p>
        ) : (
          <p>Перетащите файлы сюда или кликните, чтобы выбрать</p>
        )}
      </Wrapper>
      <ModalBackdrop zIndex="14" onClick={onClose} />
    </MainWrapper>
  );
};
