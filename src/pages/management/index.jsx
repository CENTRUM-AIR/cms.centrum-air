import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { getUsers } from "../../store";
import { MainWrapper, Title, Wrapper } from "../charters/styled";
import { UserComp } from "../../components/user-comp";
import { fetchUsers } from "../../store/create-user/fetch";
import { useGetInfo } from "../../hooks/use-get-info";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { SUPERADMIN } from "../../constants";

const Management = () => {
  const { data } = useSelector(getUsers);
  useGetInfo({ selector: getUsers, fetcher: fetchUsers });

  const navigate = useNavigate();
  const role = Cookies.get("role");
  useEffect(() => {
    if (role?.toLowerCase() !== SUPERADMIN) navigate("/not-found");
  }, [role, navigate]);

  return (
    <MainWrapper>
      <Title>Пользователи</Title>
      <Wrapper>
        <UserComp />
        {data?.length > 0 &&
          data?.map((item) => <UserComp key={item?.id} item={item} />)}
      </Wrapper>
    </MainWrapper>
  );
};

export default Management;
