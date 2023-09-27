import React, { Fragment, useEffect, useState } from "react";
import { NewsHeader } from "./header";
import { MainWrapperPages, NoInfo, TableWrapper } from "../../shared_styled";
import { ReactComponent as Edit } from "../../icons/edit.svg";
import { ReactComponent as Delete } from "../../icons/delete.svg";
import { PRESSCENTER, SUPERADMIN } from "../../constants";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getUser } from "../../store";

const CORRECT_ROLES = [SUPERADMIN, PRESSCENTER];

const News = () => {
  const navigate = useNavigate();
  const { role } = useSelector(getUser);
  useEffect(() => {
    if (!CORRECT_ROLES.includes(role)) {
      navigate("/not-found");
    }
  }, [role, navigate]);
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
          <thead>
            <tr>
              <th>ЗАГОЛОВОК</th>
              <th>КРАТКОЕ СОДЕРЖАНИЕ</th>
              <th>ДАТА</th>
              <th>ОБЛОЖКА</th>
              <th> </th>
            </tr>
          </thead>
          <tbody>
            {news.map((oneNews) => (
              <Fragment key={oneNews.id}>
                <tr>
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
              </Fragment>
            ))}
          </tbody>
        </TableWrapper>
      ) : (
        <NoInfo>No news</NoInfo>
      )}
    </MainWrapperPages>
  );
};

export default News;
