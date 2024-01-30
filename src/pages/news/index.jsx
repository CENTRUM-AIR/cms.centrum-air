import React, { Fragment, useEffect, useState } from "react";
import { HR, SUPERADMIN } from "../../constants";
import { getNews } from "../../store";
import { fetchNews } from "../../store/create-news/fetch";
import { useGetInfo } from "../../hooks/use-get-info";
import { useNavigate } from "react-router-dom";
import { MainWrapper, Title, Wrapper } from "../charters/styled";
import { NewsComp } from "../../components/news-comp";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";

const allowerRoles = [SUPERADMIN, HR];

const News = () => {
  const { data } = useSelector(getNews);
  useGetInfo({ selector: getNews, fetcher: fetchNews });

  const navigate = useNavigate();
  const role = Cookies.get("role");
  useEffect(() => {
    if (!allowerRoles?.includes(role?.toLowerCase())) navigate("/not-found");
  }, [role, navigate]);

  return (
    <MainWrapper>
      <Title>Новости</Title>
      <Wrapper>
        <NewsComp />
        {data?.length > 0 &&
          data?.map((item) => <NewsComp key={item?.id} item={item} />)}
      </Wrapper>
    </MainWrapper>
  );
};

export default News;
