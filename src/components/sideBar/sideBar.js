import { ReactComponent as News } from "../../icons/news.svg";
import { ReactComponent as Offers } from "../../icons/offers.svg";
import { ReactComponent as Vacancy } from "../../icons/vacancy.svg";
import { ReactComponent as Faq } from "../../icons/faq.svg";
import { ReactComponent as Additional } from "../../icons/additional.svg";
import { ReactComponent as Management } from "../../icons/management.svg";
import { CONTENTMANAGER, HR, PRESSCENTER, SUPERADMIN } from "../../constants";

export const sideBarItems = [
  {
    id: 1,
    text: "Новости",
    href: "/news",
    icon: <News />,
    isCanSee: [SUPERADMIN, PRESSCENTER],
  },
  {
    id: 2,
    text: "Заявки",
    href: "/applications",
    icon: <Offers />,
    isCanSee: [SUPERADMIN, HR],
  },
  {
    id: 3,
    text: "Вакансии",
    href: "/vacancies",
    icon: <Vacancy />,
    isCanSee: [SUPERADMIN, HR],
  },
  {
    id: 4,
    text: "Справочный центр",
    href: "/help-center",
    icon: <Faq />,
    isCanSee: [SUPERADMIN, PRESSCENTER],
  },
  {
    id: 6,
    text: "Управление",
    href: "/management",
    icon: <Management />,
    isCanSee: [SUPERADMIN],
  },
  {
    id: 7,
    text: "Страны и Города",
    href: "/countries",
    icon: <Additional />,
    isCanSee: [SUPERADMIN, CONTENTMANAGER],
  },
  {
    id: 8,
    text: "Чартерные рейсы",
    href: "/charters",
    icon: <Additional />,
    isCanSee: [SUPERADMIN, CONTENTMANAGER],
  },
  {
    id: 9,
    text: "Главная страницы",
    href: "/",
    icon: <Additional />,
    isCanSee: [SUPERADMIN, CONTENTMANAGER],
  },
  {
    id: 10,
    text: "Сервисы",
    href: "/services",
    icon: <Additional />,
    isCanSee: [SUPERADMIN, CONTENTMANAGER],
  },
  {
    id: 11,
    text: "Актуальные",
    href: "/directions",
    icon: <Additional />,
    isCanSee: [SUPERADMIN, CONTENTMANAGER],
  },
];
