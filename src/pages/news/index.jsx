import React, { useState } from "react";
import { NewsHeader } from "./header";
import { MainWrapperPages, NoInfo, TableWrapper } from "../../shared_styled";
import { ReactComponent as Edit } from "../../icons/edit.svg";
import { ReactComponent as Delete } from "../../icons/delete.svg";

const News = () => {
  const news = [
    {
      id: 1,
      title_ru: "title_ru",
      description_ru: "description_ru",
      date: "date",
      photo_url: "./logo192.png",
    },
    {
      id: 2,
      title_ru: "title_ru",
      description_ru: "description_ru",
      date: "date",
      photo_url: "./logo192.png",
    },
  ];
  return (
    <MainWrapperPages>
      <NewsHeader />
      {news && news?.length !== 0 ? (
        <TableWrapper>
          <tr>
            <th>ЗАГОЛОВОК</th>
            <th>КРАТКОЕ СОДЕРЖАНИЕ</th>
            <th>ДАТА</th>
            <th>ОБЛОЖКА</th>
            <th> </th>
          </tr>
          {news.map((oneNews) => (
            <>
              <tr key={oneNews.id}>
                <td>{oneNews.title_ru}</td>
                <td>{oneNews.description_ru}</td>
                <td>{oneNews.date}</td>
                <td>
                  <img
                    width="50px"
                    height="50px"
                    src={oneNews.photo_url}
                    alt="news cover"
                  />
                </td>
                <td>
                  <Edit /> <Delete />
                </td>
              </tr>
              {/* {openModal && (
                <CreateUser
                  userId={oneNews.id}
                  onClose={() => setOpenModal(false)}
                  title="Обновить пользователя"
                />
              )} */}
            </>
          ))}
        </TableWrapper>
      ) : (
        <NoInfo>No news</NoInfo>
      )}
    </MainWrapperPages>
  );
};

export default News;
