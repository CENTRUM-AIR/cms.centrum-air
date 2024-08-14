import React, { useState } from "react";
import { Holder, PlusCircle, PlusHolder, Text, Wrapper } from "./styled";
import Design from "../creation/design";
import { ReactComponent as PlusSign } from "../../icons/plus-sign.svg";
import { useDispatch } from "react-redux";
import { PdfLoader } from "../pdf-loader";
import { patchJournal } from "../../store/journals/patch";
import { sendJournal } from "../../store/journals/post";
import { deleteJournal } from "../../store/journals/delete";

export const JournalComp = ({ item }) => {
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [details, setDetails] = useState({
    ru: item?.details_ru || "",
    en: item?.details_en || "",
    uz: item?.details_uz || "",
  });
  const [file, setFile] = useState(item?.journal || "");
  const handleClick = (e) => setOpenModal(!openModal);

  const handlePublish = () => {
    if (details && file) {
      if (item) {
        dispatch(
          patchJournal({
            details,
            journal: file,
            id: item?.id,
          }),
        );
      } else {
        dispatch(
          sendJournal({
            details,
            journal: file,
          }),
        );
      }
    }
    setOpenModal(false);
  };
  const handleDelete = () => {
    dispatch(deleteJournal({ id: item?.id }));
    setOpenModal(false);
  };
  return (
    <>
      <Wrapper onClick={handleClick}>
        {!item ? (
          <PlusHolder onClick={handleClick}>
            <PlusCircle>
              <PlusSign />
            </PlusCircle>
            <p>Добавить новое</p>
          </PlusHolder>
        ) : (
          <Holder>
            <PdfLoader url={item?.journal} />
            <Text> {item?.details_ru} </Text>
          </Holder>
        )}
      </Wrapper>
      {openModal && (
        <Design
          titleText="Journal Component"
          item={{ title: details, isTitleInput: true, mainText: 'Детали' }}
          canBePublished={details}
          onClose={handleClick}
          setText={setDetails}
          setFile={setFile}
          file={file}
          isPhoto={false}
          handlePublish={handlePublish}
          onDelete={handleDelete}
          isNew={!item}
        />
      )}
    </>
  );
};
