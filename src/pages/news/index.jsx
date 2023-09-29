import React, { Fragment, useEffect, useState } from "react";
import { NewsHeader } from "./header";
import { MainWrapperPages, NoInfo, TableWrapper } from "../../shared_styled";
import { ReactComponent as Edit } from "../../icons/edit.svg";
import { ReactComponent as Delete } from "../../icons/delete.svg";
import { NEWS, PRESSCENTER, SUPERADMIN } from "../../constants";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllInfo, getUser } from "../../store";
import { deleteInfo, fetchNews } from "../../store/get-api-info";
import Edition from "../../components/creation/edition";
import {
  setNewsEnglish,
  setNewsPhoto,
  setNewsRussian,
  setNewsUzbek,
} from "../../store/create-news";
import { patchNews } from "../../store/patch-api-info";
import { DeletionModal } from "../../components/deletionModal";
import api from "../../utils/api";

const CORRECT_ROLES = [SUPERADMIN, PRESSCENTER];

const News = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { news, newsFetched } = useSelector(getAllInfo);
  const { role, login } = useSelector(getUser);
  const [search, setSearch] = useState("");
  const [filteredNews, setFilteredNews] = useState(news);
  const [openModal, setOpenModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  useEffect(() => {
    if (!CORRECT_ROLES.includes(role)) {
      navigate("/not-found");
    }
  }, [role, navigate]);

  useEffect(() => {
    if (role && login && !newsFetched) dispatch(fetchNews());
  }, [dispatch, role, login, newsFetched]);

  const handleOpenModal = (id) => {
    const currentNews = news.find((oneNews) => oneNews.id === id);
    dispatch(
      setNewsEnglish({
        title: currentNews.title_en,
        description: currentNews.description_en,
        small_description: currentNews.small_description_en,
      })
    );
    dispatch(
      setNewsRussian({
        title: currentNews.title_ru,
        description: currentNews.description_ru,
        small_description: currentNews.small_description_ru,
      })
    );
    dispatch(
      setNewsUzbek({
        title: currentNews.title_uz,
        description: currentNews.description_uz,
        small_description: currentNews.small_description_uz,
      })
    );
    dispatch(setNewsPhoto({ photo: currentNews.photo_url }));
    setOpenModal(id);
  };

  const updateNews = (data) => {
    dispatch(patchNews(data));
  };

  const handleDelete = async (id) => {
    await api.delete(`/news/${id}`);
    dispatch(deleteInfo({ id, type: NEWS }));
    setOpenDeleteModal(false);
  };

  useEffect(() => {
    if (search) {
      setFilteredNews(
        news.filter(
          (oneNews) =>
            oneNews.title_ru.toLowerCase().includes(search.toLowerCase()) ||
            oneNews.title_en.toLowerCase().includes(search.toLowerCase()) ||
            oneNews.title_uz.toLowerCase().includes(search.toLowerCase()) ||
            oneNews.description_ru
              .toLowerCase()
              .includes(search.toLowerCase()) ||
            oneNews.description_en
              .toLowerCase()
              .includes(search.toLowerCase()) ||
            oneNews.description_uz
              .toLowerCase()
              .includes(search.toLowerCase()) ||
            oneNews.small_description_ru
              .toLowerCase()
              .includes(search.toLowerCase()) ||
            oneNews.small_description_en
              .toLowerCase()
              .includes(search.toLowerCase()) ||
            oneNews.small_description_uz
              .toLowerCase()
              .includes(search.toLowerCase())
        )
      );
    } else {
      setFilteredNews(news);
    }
  }, [search, news]);

  return (
    <MainWrapperPages>
      <NewsHeader search={search} setSearch={setSearch} />
      {filteredNews && filteredNews?.length !== 0 ? (
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
            {filteredNews.map((oneNews) => (
              <Fragment key={oneNews.id}>
                <tr>
                  <td>{oneNews.title_ru}</td>
                  <td>{oneNews.description_ru}</td>
                  <td>{oneNews.updated_at.slice(0, 10)}</td>
                  <td>
                    <img
                      width="50px"
                      height="50px"
                      src={oneNews.photo_url}
                      alt="news cover"
                    />
                  </td>
                  <td>
                    <Edit onClick={() => handleOpenModal(oneNews?.id)} />{" "}
                    <Delete onClick={() => setOpenDeleteModal(oneNews?.id)} />
                  </td>
                </tr>
                {openModal === oneNews?.id && (
                  <Edition
                    actionType={NEWS}
                    onClose={() => setOpenModal(false)}
                    titleText="Обновить Новость"
                    itemId={oneNews?.id}
                    sendInfo={updateNews}
                  />
                )}
                {openDeleteModal === oneNews?.id && (
                  <DeletionModal
                    handleDelete={() => handleDelete(oneNews?.id)}
                    removeDelete={() => setOpenDeleteModal(false)}
                  />
                )}
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
