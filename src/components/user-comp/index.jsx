import React, { useState } from "react";
import { EmptyHolder, TextHolder, Title, Wrapper, YourUser } from "./styled";
import avatar from "../../icons/user-solid.png";
import { ReactComponent as PlusSign } from "../../icons/plus-sign.svg";
import { useDispatch } from "react-redux";
import { areAllKeysNotEmpty } from "../../utils/obj-not-empty";
import { patchUser } from "../../store/create-user/patch";
import { sendUsers } from "../../store/create-user/post";
import { deleteUser } from "../../store/create-user/delete";
import Design from "../creation/design";
import Cookies from "js-cookie";

const getCorrectRole = (role) => {
  switch (role) {
    case "superAdmin":
      return { label: "Super Admin", value: "superAdmin" };
    case "pressCenter":
      return { label: "Press Center", value: "pressCenter" };
    case "hr":
      return { label: "HR", value: "hr" };
    case "contentManager":
      return { label: "Content Manager", value: "contentManager" };
    default:
      return { label: "Press Center", value: "pressCenter" };
  }
};

export const UserComp = ({ item }) => {
  const login = Cookies.get("login");
  const role = Cookies.get("role");
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [info, setInfo] = useState({
    login: item?.login || "",
    role: getCorrectRole(item?.role),
    password: "",
  });
  const handleClick = (e) => setOpenModal(!openModal);

  const handlePublish = () => {
    if (areAllKeysNotEmpty(info)) {
      if (item) {
        dispatch(
          patchUser({
            info,
            id: item?.id,
          })
        );
      } else {
        dispatch(sendUsers({ info }));
      }
    }
    setOpenModal(false);
  };
  const handleDelete = () => {
    dispatch(deleteUser({ id: item?.id }));
    setOpenModal(false);
  };
  return (
    <>
      <Wrapper
        isuser={login === item?.login && role === item?.role}
        onClick={handleClick}
      >
        <img src={avatar} alt="user icon" width="60px" height="60px" />
        {item ? (
          <>
            <YourUser>
              {login === item?.login && role === item?.role
                ? "Ваш пользователь"
                : ""}
            </YourUser>
            <TextHolder>
              <span>login:</span>
              <Title> {item?.login}</Title>
            </TextHolder>
            <TextHolder>
              <span>role:</span>
              <p>{item?.role}</p>
            </TextHolder>
          </>
        ) : (
          <EmptyHolder>
            <p>Добавить нового</p>
            <PlusSign />
          </EmptyHolder>
        )}
      </Wrapper>
      {openModal && (
        <Design
          titleText="Пользователи"
          item={info}
          canBePublished={areAllKeysNotEmpty(info)}
          onClose={handleClick}
          handlePublish={handlePublish}
          onDelete={handleDelete}
          isNew={!item || (login === item?.login && role === item?.role)}
          isPhoto={false}
          setUserInfo={setInfo}
        />
      )}
    </>
  );
};
