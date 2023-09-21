import React, { useState } from "react";
import { ManagementHeader } from "../../components/managementHeader";
import {
  MainWrapper,
  StyledPassword,
  StyledSpan,
  TableWrapper,
} from "./styled";
import { ReactComponent as Edit } from "../../icons/edit.svg";
import { ReactComponent as Delete } from "../../icons/delete.svg";
import { ReactComponent as Eye } from "../../icons/eyepass.svg";
import { getAllInfo } from "../../store";
import { useSelector } from "react-redux";
const Management = () => {
  const { users } = useSelector(getAllInfo);
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = (id) =>
    showPassword === id ? setShowPassword(false) : setShowPassword(id);
  return (
    <MainWrapper>
      <ManagementHeader />
      <TableWrapper>
        <tr>
          <th>ЛОГИН</th>
          <th>ПАРОЛЬ</th>
          <th>РОЛЬ</th>
          <th> </th>
        </tr>
        {users && users?.length !== 0 ? (
          users.map((user) => (
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
                <Edit /> <Delete />
              </td>
            </tr>
          ))
        ) : (
          <p>No users</p>
        )}
      </TableWrapper>
    </MainWrapper>
  );
};

export default Management;
