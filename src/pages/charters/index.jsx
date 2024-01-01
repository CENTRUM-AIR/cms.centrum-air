import React, { useEffect } from "react";
import { getCharters } from "../../store";
import { useSelector } from "react-redux";
import { useGetInfo } from "../../hooks/use-get-info";
import { fetchCharters } from "../../store/create-charter/fetch";
import { MainWrapper, Title, Wrapper } from "./styled";
import { CharterComp } from "../../components/charter-comp";
import { CONTENTMANAGER, SUPERADMIN } from "../../constants";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const allowerRoles = [SUPERADMIN, CONTENTMANAGER];

const Charters = () => {
  const { data } = useSelector(getCharters);
  useGetInfo({ selector: getCharters, fetcher: fetchCharters });

  const navigate = useNavigate();
  const role = Cookies.get("role");
  useEffect(() => {
    if (!allowerRoles?.includes(role?.toLowerCase())) navigate("/not-found");
  }, [role, navigate]);

  return (
    <MainWrapper>
      <Title>Чартеры</Title>
      <Wrapper>
        <CharterComp />
        {data?.length > 0 &&
          data?.map((item) => <CharterComp key={item?.id} item={item} />)}
      </Wrapper>
    </MainWrapper>
  );
};

export default Charters;
