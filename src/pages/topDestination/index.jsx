import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { getDestinations, getTopDestinations } from "../../store";
import { useGetInfo } from "../../hooks/use-get-info";
import { fetchDestinations } from "../../store/create-destinations/fetch";
import { MainWrapper, Title, Wrapper } from "../charters/styled";
import { DestinationComp } from "../../components/destinations-comp";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { CONTENTMANAGER, SUPERADMIN } from "../../constants";
import { fetchTopDestinations } from "../../store/create-top-destinations/fetch";
import { TopDestinationComp } from "../../components/topDestinations-comp";

const allowerRoles = [SUPERADMIN, CONTENTMANAGER];

const TopDistination = () => {
  const { data } = useSelector(getTopDestinations);
  useGetInfo({ selector: getTopDestinations, fetcher: fetchTopDestinations });

  const navigate = useNavigate();
  const role = Cookies.get("role");
  useEffect(() => {
    if (!allowerRoles?.includes(role?.toLowerCase())) navigate("/not-found");
  }, [role, navigate]);

  return (
    <MainWrapper>
      <Title>top destination</Title>
      <Wrapper>
        <TopDestinationComp />
        {data?.length > 0 &&
          data?.map((item) => (
            <TopDestinationComp key={item?.id} item={item} />
          ))}
      </Wrapper>
    </MainWrapper>
  );
};

export default TopDistination;
