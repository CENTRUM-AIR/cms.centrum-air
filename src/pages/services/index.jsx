import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { getServices } from "../../store";
import { useGetInfo } from "../../hooks/use-get-info";
import { fetchServices } from "../../store/create-additional-service/fetch";
import { MainWrapper, Title, Wrapper } from "../charters/styled";
import { ServicesComp } from "../../components/services-comp";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { CONTENTMANAGER, SUPERADMIN } from "../../constants";

const allowerRoles = [SUPERADMIN, CONTENTMANAGER];

const Services = () => {
  const { data } = useSelector(getServices);
  useGetInfo({ selector: getServices, fetcher: fetchServices });

  const navigate = useNavigate();
  const role = Cookies.get("role");
  useEffect(() => {
    if (!allowerRoles?.includes(role?.toLowerCase())) navigate("/not-found");
  }, [role, navigate]);

  return (
    <MainWrapper>
      <Title>Дополнительные сервисы</Title>
      <Wrapper>
        <ServicesComp />
        {data?.length > 0 &&
          data?.map((item) => <ServicesComp key={item?.id} item={item} />)}
      </Wrapper>
    </MainWrapper>
  );
};

export default Services;
