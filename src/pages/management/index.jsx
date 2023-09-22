import React, { useState } from "react";
import { ManagementHeader } from "../../components/managementHeader";
import { StyledPassword, StyledSpan } from "./styled";
import { ReactComponent as Edit } from "../../icons/edit.svg";
import { ReactComponent as Delete } from "../../icons/delete.svg";
import { ReactComponent as Eye } from "../../icons/eyepass.svg";
import { getAllInfo } from "../../store";
import { useSelector } from "react-redux";
import { CreateUser } from "../../components/creation/createUser";
import { MainWrapperPages, NoInfo, TableWrapper } from "../../shared_styled";
const Management = () => {
  const { users } = useSelector(getAllInfo);
  const [showPassword, setShowPassword] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const handleShowPassword = (id) =>
    showPassword === id ? setShowPassword(false) : setShowPassword(id);
  return (
    <MainWrapperPages>
      <ManagementHeader />
      {users && users?.length !== 0 ? (
        <TableWrapper>
          <tr>
            <th>ЛОГИН</th>
            <th>ПАРОЛЬ</th>
            <th>РОЛЬ</th>
            <th> </th>
          </tr>
          {users.map((user) => (
            <>
              <tr key={user.id}>
                <td>{user.login}</td>
                <StyledPassword>
                  <StyledSpan>
                    {showPassword === user?.id ? user.password : "**********"}{" "}
                    {""}
                  </StyledSpan>
                  <span onClick={() => handleShowPassword(user.id)}>
                    <Eye />
                  </span>
                </StyledPassword>
                <td>{user.role}</td>
                <td>
                  <Edit onClick={() => setOpenModal(user.id)} /> <Delete />
                </td>
              </tr>
              {openModal && (
                <CreateUser
                  userId={user.id}
                  onClose={() => setOpenModal(false)}
                  title="Обновить пользователя"
                />
              )}
            </>
          ))}
        </TableWrapper>
      ) : (
        <NoInfo>No users</NoInfo>
      )}
    </MainWrapperPages>
  );
};

export default Management;
