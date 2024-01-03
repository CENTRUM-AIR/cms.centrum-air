import React from "react";
import { Wrapper } from "./styled";
import { format } from "date-fns";

export const LoggerComp = ({ item }) => {
  return (
    <Wrapper>
      <p>
        Действие:<span> {item?.action}</span>
      </p>
      <p>
        Пользователь: <span>{item?.user}</span>
      </p>
      <p>
        Объект: <span>{item?.chaging_object}</span>
      </p>
      <p>
        Время: <span>{format(new Date(item?.created_at), "HH:mm, PP")}</span>
      </p>
    </Wrapper>
  );
};
