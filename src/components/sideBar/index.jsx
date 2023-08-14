import React from "react";
import { Logo, MenuItem, MenuWrapper, Wrapper } from "./styled";
import { ReactComponent as CentrumLogo } from "../../icons/centrum.svg";
import { ReactComponent as News } from "../../icons/news.svg";
import { ReactComponent as Offers } from "../../icons/offers.svg";
import { ReactComponent as Vacancy } from "../../icons/vacancy.svg";
import { ReactComponent as Faq } from "../../icons/faq.svg";
import { ReactComponent as Additional } from "../../icons/additional.svg";
import { ReactComponent as Management } from "../../icons/management.svg";

export const SideBar = () => {
  return (
    <Wrapper>
      <Logo>
        <CentrumLogo width="137px" height="44px" />
      </Logo>
      <MenuWrapper>
        <MenuItem>
          <News />
          <p>Новости</p>
        </MenuItem>
        <MenuItem>
          <Offers />
          <p>Заявки</p>
        </MenuItem>
        <MenuItem>
          <Vacancy />
          <p>Вакансии</p>
        </MenuItem>
        <MenuItem>
          <Faq />
          <p>Справочный центр</p>
        </MenuItem>
        <MenuItem>
          <Additional />
          <p>Доп. Изменения</p>
        </MenuItem>
        <MenuItem>
          <Management />
          <p>Управление</p>
        </MenuItem>
      </MenuWrapper>
    </Wrapper>
  );
};
