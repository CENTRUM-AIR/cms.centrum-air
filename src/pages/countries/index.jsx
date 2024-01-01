import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { getCountries } from "../../store";
import { useGetInfo } from "../../hooks/use-get-info";
import { MainWrapper, Title, Wrapper } from "../charters/styled";
import { CountryComp } from "../../components/country-comp";
import { fetchCountries } from "../../store/create-countries/fetch";
import { CONTENTMANAGER, SUPERADMIN } from "../../constants";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const allowerRoles = [SUPERADMIN, CONTENTMANAGER];

const Countries = () => {
  const { data } = useSelector(getCountries);
  useGetInfo({ selector: getCountries, fetcher: fetchCountries });
  const navigate = useNavigate();
  const role = Cookies.get("role");
  useEffect(() => {
    if (!allowerRoles?.includes(role?.toLowerCase())) navigate("/not-found");
  }, [role, navigate]);

  return (
    <MainWrapper>
      <Title>Страны и города</Title>
      <Wrapper>
        <CountryComp />
        {data?.length > 0 &&
          data?.map((item) => <CountryComp key={item?.id} item={item} />)}
      </Wrapper>
    </MainWrapper>
  );
};

export default Countries;
