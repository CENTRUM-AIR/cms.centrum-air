import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { getSetting } from "../../store";
import { useGetInfo } from "../../hooks/use-get-info";
import { MainWrapper, Title, Wrapper } from "../charters/styled";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { CONTENTMANAGER, SUPERADMIN } from "../../constants";
import { fetchTopDestinations } from "../../store/create-top-destinations/fetch";
import { SettingComp } from "../../components/setting-comp";
import { fetchSetting } from "../../store/create-setting/fetch";

const allowerRoles = [SUPERADMIN, CONTENTMANAGER];

const Setting = () => {
  const { data } = useSelector(getSetting);
  useGetInfo({ selector: getSetting, fetcher: fetchSetting });

  const navigate = useNavigate();
  const role = Cookies.get("role");
  useEffect(() => {
    if (!allowerRoles?.includes(role?.toLowerCase())) navigate("/not-found");
  }, [role, navigate]);

  return (
    <MainWrapper>
      <Title>Setting</Title>
      <Wrapper>
        <SettingComp />
        {data?.length > 0 &&
          data?.map((item) => <SettingComp key={item?.id} item={item} />)}
      </Wrapper>
    </MainWrapper>
  );
};

export default Setting;
