import React, { useState } from "react";
import { EmptyHolder, Title, Wrapper } from "./styled";
import { ReactComponent as PlusSign } from "../../icons/plus-sign.svg";
import { useDispatch } from "react-redux";
import Design from "../creation/design";
// import { patchSetting } from "../../store/create-setting/patch";
import { sendSetting } from "../../store/create-setting/post";
import { patchSetting } from "../../store/create-setting/patch";
import { useGetInfo } from "../../hooks/use-get-info";
import { getSetting } from "../../store";
import { fetchSetting } from "../../store/create-setting/fetch";
// import { deleteSetting } from "../../store/create-setting/delete";
export const SettingComp = ({ item }) => {
  const dispatch = useDispatch();
  const [unlanguage, setUnlanguage] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const handleClick = (e) => setOpenModal(!openModal);

  const [key, setKey] = useState(item?.key || "");
  const [value, setValue] = useState(item?.value || "");
  useGetInfo({ selector: getSetting, fetcher: fetchSetting });
  const handlePublish = () => {
    if (key && value) {
      if (item) {
        dispatch(
          patchSetting({
            key,
            value,
            id: item?.id,
          })
        );
      } else {
        dispatch(
          sendSetting({
            key,
            value,
          })
        );
      }
    }
    setOpenModal(false);
  };

  // const handleDelete = () => {
  //   dispatch(deleteSetting({ id: item?.id }));
  //   setOpenModal(false);
  // };

  return (
    <>
      <Wrapper onClick={handleClick}>
        {item ? (
          <>
            <Title>{item?.key}:</Title>
            <p dangerouslySetInnerHTML={{ __html: item?.value }} />
          </>
        ) : (
          <EmptyHolder>
            <p>Добавить новое</p>
            <PlusSign />
          </EmptyHolder>
        )}
      </Wrapper>
      {openModal && (
        <Design
          titleText="Setting component"
          item={{ key, value, isTitleInput: true }}
          canBePublished={key && value}
          onClose={handleClick}
          setKey={setKey}
          setValue={setValue}
          handlePublish={handlePublish}
          // onDelete={handleDelete}

          isNew={!item}
          isPhoto={false}
          shortDescTitle="Направление"
          setSetting={unlanguage}
        />
      )}
    </>
  );
};
