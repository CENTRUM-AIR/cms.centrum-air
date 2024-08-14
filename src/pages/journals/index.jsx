import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { CONTENTMANAGER, ROLES_TEXT, SUPERADMIN } from "../../constants";
import { MainWrapper, Title, Wrapper } from "../charters/styled";
import { useGetInfo } from "../../hooks/use-get-info";
import { JournalComp } from "../../components/journal-comp";
import { getJournals } from "../../store";
import { fetchJournal } from "../../store/journals/fetch";

const allowerRoles = [SUPERADMIN, CONTENTMANAGER];

const Journals = () => {
  const { data } = useSelector(getJournals);
  useGetInfo({ selector: getJournals, fetcher: fetchJournal });

  const navigate = useNavigate();
  const role = Cookies.get("role");
  useEffect(() => {
    if (!ROLES_TEXT?.includes(role?.toLowerCase())) {
      Cookies.remove("role");
      navigate("/login");
    } else if (!allowerRoles?.includes(role?.toLowerCase()))
      navigate("/not-found");
  }, [role, navigate]);

  return (
    <MainWrapper>
      <Title>Журналы</Title>
      <Wrapper>
        <JournalComp />
        {data?.length > 0 &&
          data?.map((item) => <JournalComp key={item?.id} item={item} />)}
      </Wrapper>
    </MainWrapper>
  );
};

export default Journals;
