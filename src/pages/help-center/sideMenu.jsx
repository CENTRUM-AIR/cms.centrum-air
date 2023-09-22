import React from "react";
import { ChapterText, InfoHolder, PlaceHolder, Wrapper } from "./styled";
import { StyledButton, StyledInput } from "../../shared_styled";

export const SideMenu = () => {
  const chapters = [
    {
      id: 1,
      title: "title",
    },
    {
      id: 2,
      title: "title2",
    },
    {
      id: 3,
      title: "title3 asfjkhasjkfhsk hsak hfaklsh l ajslkfja;l dsa",
    },
  ];
  return (
    <Wrapper>
      <PlaceHolder />
      <InfoHolder>
        <StyledInput width="200px" placeholder="Поиск" />
        {chapters.map((chapter) => (
          <ChapterText key={chapter.id}>{chapter.title}</ChapterText>
        ))}
        <StyledButton height="40px">+ Добавить Вопрос</StyledButton>
      </InfoHolder>
    </Wrapper>
  );
};
