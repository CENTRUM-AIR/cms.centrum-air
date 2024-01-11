import React, { useEffect } from "react";
import { HR, SUPERADMIN } from "../../constants";
import { useSelector } from "react-redux";
import { getVacancies } from "../../store";
import { fetchVacancies } from "../../store/vacancies/fetch";
import { useGetInfo } from "../../hooks/use-get-info";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { MainWrapper, Title, Wrapper } from "../charters/styled";
import { VacancyComp } from "../../components/vacancy-comp";

const allowerRoles = [SUPERADMIN, HR];

const Vacancies = () => {
  const { data } = useSelector(getVacancies);
  useGetInfo({ selector: getVacancies, fetcher: fetchVacancies });

  const navigate = useNavigate();
  const role = Cookies.get("role");
  useEffect(() => {
    if (!allowerRoles?.includes(role?.toLowerCase())) navigate("/not-found");
  }, [role, navigate]);
  return (
    <MainWrapper>
      <Title>Вакансии</Title>
      <Wrapper>
        <VacancyComp />
        {data?.length > 0 &&
          data?.map((item) => <VacancyComp key={item?.id} item={item} />)}
      </Wrapper>
    </MainWrapper>
  );
};

export default Vacancies;
