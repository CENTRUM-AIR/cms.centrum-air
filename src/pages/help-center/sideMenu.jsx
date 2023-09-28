import React, { Fragment, useState } from "react";
import {
  ChapterText,
  ChapterWrapper,
  InfoHolder,
  PlaceHolder,
  Wrapper,
} from "./styled";
import { StyledButton, StyledInput } from "../../shared_styled";
import { ReactComponent as Delete } from "../../icons/delete.svg";
import { DeletionModal } from "../../components/deletionModal";
import api from "../../utils/api";
import { useDispatch, useSelector } from "react-redux";
import { deleteInfo } from "../../store/get-api-info";
import { FAQ } from "../../constants";
import { getFaq } from "../../store";

export const SideMenu = ({
  faq,
  handleNewFaq,
  setSearch,
  search,
  handleUpdateFaq,
}) => {
  const dispatch = useDispatch();
  const { id } = useSelector(getFaq);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const handleDelete = async (id) => {
    await api.delete(`/faq/${id}`);
    dispatch(deleteInfo({ id, type: FAQ }));
    setOpenDeleteModal(false);
  };
  return (
    <Wrapper>
      <PlaceHolder />
      <InfoHolder>
        <StyledInput
          width="200px"
          placeholder="Поиск"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {faq.length !== 0 ? (
          faq.map((chapter) => (
            <Fragment key={chapter.id}>
              <ChapterWrapper
                isselected={id === chapter?.id ? "true" : undefined}
              >
                <ChapterText onClick={() => handleUpdateFaq(chapter)}>
                  {chapter?.question_ru}
                </ChapterText>
                <Delete onClick={() => setOpenDeleteModal(chapter?.id)} />
              </ChapterWrapper>
              {openDeleteModal === chapter?.id && (
                <DeletionModal
                  removeDelete={() => setOpenDeleteModal(false)}
                  handleDelete={() => handleDelete(chapter?.id)}
                />
              )}
            </Fragment>
          ))
        ) : (
          <ChapterText>Нет новостей</ChapterText>
        )}
        <br />
        <StyledButton onClick={handleNewFaq} height="40px">
          + Добавить Вопрос
        </StyledButton>
      </InfoHolder>
    </Wrapper>
  );
};
