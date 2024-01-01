import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { getFaq } from "../../store";
import { useGetInfo } from "../../hooks/use-get-info";
import { MainWrapper, Title, Wrapper } from "../charters/styled";
import { FaqComp } from "../../components/faq-comp";
import { fetchFaq } from "../../store/create-faq/fetch";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { PRESSCENTER, SUPERADMIN } from "../../constants";

const allowerRoles = [SUPERADMIN, PRESSCENTER];

const HelpCenter = () => {
  const { data } = useSelector(getFaq);
  useGetInfo({ selector: getFaq, fetcher: fetchFaq });

  const navigate = useNavigate();
  const role = Cookies.get("role");
  useEffect(() => {
    if (!allowerRoles?.includes(role?.toLowerCase())) navigate("/not-found");
  }, [role, navigate]);

  return (
    <MainWrapper>
      <Title>Вопросы и ответы</Title>
      <Wrapper>
        <FaqComp />
        {data?.length > 0 &&
          data?.map((item) => <FaqComp key={item?.id} item={item} />)}
      </Wrapper>
    </MainWrapper>
  );
};

export default HelpCenter;
