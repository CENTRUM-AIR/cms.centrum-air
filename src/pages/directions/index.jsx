import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { getDestinations } from "../../store";
import { useGetInfo } from "../../hooks/use-get-info";
import { fetchDestinations } from "../../store/create-destinations/fetch";
import { MainWrapper, Title, Wrapper } from "../charters/styled";
import { DestinationComp } from "../../components/destinations-comp";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { CONTENTMANAGER, SUPERADMIN } from "../../constants";

const allowerRoles = [SUPERADMIN, CONTENTMANAGER];

const Directions = () => {
  const { data } = useSelector(getDestinations);
  useGetInfo({ selector: getDestinations, fetcher: fetchDestinations });

  const navigate = useNavigate();
  const role = Cookies.get("role");
  useEffect(() => {
   if (!allowerRoles?.includes(role?.toLowerCase())) navigate("/not-found");
  }, [role, navigate]);

  return (
    <MainWrapper>
      <Title>Актуальные Предложения</Title>
      <Wrapper>
        <DestinationComp />
        {data?.length > 0 &&
          data?.map((item) => <DestinationComp key={item?.id} item={item} />)}
      </Wrapper>
    </MainWrapper>
  );
};

export default Directions;
