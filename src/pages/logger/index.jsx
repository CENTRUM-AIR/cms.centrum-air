import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { getActions } from "../../store";
import { useGetInfo } from "../../hooks/use-get-info";
import { MainWrapper, Title, Wrapper } from "../charters/styled";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { SUPERADMIN } from "../../constants";
import { fetchLogs } from "../../store/get-actions/fetch";
import { LoggerComp } from "../../components/logger-comp";

const allowerRoles = [SUPERADMIN];

const Logger = () => {
  const { data } = useSelector(getActions);
  useGetInfo({ selector: getActions, fetcher: fetchLogs });

  const navigate = useNavigate();
  const role = Cookies.get("role");
  useEffect(() => {
    if (!allowerRoles?.includes(role?.toLowerCase())) navigate("/not-found");
  }, [role, navigate]);

  return (
    <MainWrapper>
      <Title>Недавние действия</Title>
      <Wrapper>
        {data?.length > 0 &&
          data?.map((item) => <LoggerComp key={item?.id} item={item} />)}
      </Wrapper>
    </MainWrapper>
  );
};

export default Logger;
