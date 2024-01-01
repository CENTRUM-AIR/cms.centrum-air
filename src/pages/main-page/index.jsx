import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { getMainPage } from "../../store";
import { useGetInfo } from "../../hooks/use-get-info";
import { fetchMainPage } from "../../store/create-main-page/fetch";
import { MainPageComp } from "../../components/mainpage-comp";
import { MainWrapper, Title, Wrapper } from "../charters/styled";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { CONTENTMANAGER, SUPERADMIN } from "../../constants";

const allowerRoles = [SUPERADMIN, CONTENTMANAGER];

const MainPage = () => {
  const { data } = useSelector(getMainPage);
  useGetInfo({ selector: getMainPage, fetcher: fetchMainPage });

  const navigate = useNavigate();
  const role = Cookies.get("role");
  useEffect(() => {
    if (!allowerRoles?.includes(role?.toLowerCase())) navigate("/not-found");
  }, [role, navigate]);

  return (
    <MainWrapper>
      <Title>Главная страница</Title>
      <Wrapper>
        <MainPageComp />
        {data?.length > 0 &&
          data?.map((item) => <MainPageComp key={item?.id} item={item} />)}
      </Wrapper>
    </MainWrapper>
  );
};

export default MainPage;
