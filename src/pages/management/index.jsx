import React, { Fragment, useEffect, useState } from "react";
import { ManagementHeader } from "../../components/managementHeader";
import { ReactComponent as Edit } from "../../icons/edit.svg";
import { ReactComponent as Delete } from "../../icons/delete.svg";
import { getAllInfo, getUser } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { CreateUser } from "../../components/creation/createUser";
import { MainWrapperPages, NoInfo, TableWrapper } from "../../shared_styled";
import { deleteInfo, fetchUsers } from "../../store/get-api-info";
import createUser, { setNewUser } from "../../store/create-user";
import api from "../../utils/api";
import { DeletionModal } from "../../components/deletionModal";
import { SUPERADMIN, USERS } from "../../constants";
import { useNavigate } from "react-router-dom";

const CORRECT_ROLES = [SUPERADMIN];

const Management = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { users, usersFetched } = useSelector(getAllInfo);
  const [deleteModal, setDeleteModal] = useState(false);
  const { role } = useSelector(getUser);
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = (user) => {
    dispatch(
      setNewUser({
        login: user?.login,
        role: user?.role,
        id: user?.id,
      })
    );
    setOpenModal(user?.id);
  };

  const handleDelete = async (id, type) => {
    await api.delete(`/users/delete/${id}`);
    dispatch(deleteInfo({ id, type }));
    setDeleteModal(false);
  };

  useEffect(() => {
    if (!CORRECT_ROLES.includes(role)) {
      navigate("/not-found");
    }
  }, [role, navigate]);
  useEffect(() => {
    if (!usersFetched && role) dispatch(fetchUsers());
  }, [dispatch, usersFetched, role]);
  return (
    <MainWrapperPages>
      <ManagementHeader />
      {users && users?.length !== 0 ? (
        <TableWrapper>
          <thead>
            <tr>
              <th>ЛОГИН</th>
              <th>РОЛЬ</th>
              <th> </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <Fragment key={user.id}>
                <tr>
                  <td>{user.login}</td>
                  <td>{user.role}</td>
                  <td style={{ textAlign: "end" }}>
                    <Edit onClick={() => handleOpenModal(user)} />{" "}
                    <Delete onClick={() => setDeleteModal(user?.id)} />
                  </td>
                </tr>
                {openModal === user?.id && (
                  <CreateUser
                    update={(data) => dispatch(createUser(data))}
                    userId={user?.id}
                    onClose={() => setOpenModal(false)}
                    title="Обновить пользователя"
                  />
                )}
                {deleteModal === user?.id && (
                  <DeletionModal
                    handleDelete={() => handleDelete(user?.id, USERS)}
                    removeDelete={() => setDeleteModal(false)}
                  />
                )}
              </Fragment>
            ))}
          </tbody>
        </TableWrapper>
      ) : (
        <NoInfo>No users</NoInfo>
      )}
    </MainWrapperPages>
  );
};

export default Management;
