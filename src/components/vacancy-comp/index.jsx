import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { areAllKeysNotEmpty } from "../../utils/obj-not-empty";
import Design from "../creation/design";
import { ReactComponent as PlusSign } from "../../icons/plus-sign.svg";
import { EmptyHolder, Title, Wrapper, Department } from "./styled";
import { sendVacancy } from "../../store/vacancies/post";
import { patchVacancy } from "../../store/vacancies/edit";
import { deleteVacancy } from "../../store/vacancies/delete";

export const VacancyComp = ({ item }) => {
  const [openModal, setOpenModal] = useState(false);
  const handleClick = (e) => setOpenModal(!openModal);
  const dispatch = useDispatch();
  const [vacancyTitle, setVacancyTitle] = useState({
    uz: item?.vacancy_uz || "",
    ru: item?.vacancy_ru || "",
    en: item?.vacancy_en || "",
  });
  const [department, setDepartment] = useState({
    uz: item?.department_uz || "",
    ru: item?.department_ru || "",
    en: item?.department_en || "",
  });
  const [mustKnow, setMustKnow] = useState({
    uz: item?.must_know_uz || "",
    ru: item?.must_know_ru || "",
    en: item?.must_know_en || "",
  });
  const [responsibilities, setResponsibilities] = useState({
    uz: item?.responsibilities_uz || "",
    ru: item?.responsibilities_ru || "",
    en: item?.responsibilities_en || "",
  });
  const [requirements, setRequirements] = useState({
    uz: item?.requirements_uz || "",
    ru: item?.requirements_ru || "",
    en: item?.requirements_en || "",
  });
  const [skills, setSkills] = useState({
    uz: item?.skills_uz || "",
    ru: item?.skills_ru || "",
    en: item?.skills_en || "",
  });

  const handlePublish = () => {
    if (
      areAllKeysNotEmpty(vacancyTitle) &&
      areAllKeysNotEmpty(department) &&
      areAllKeysNotEmpty(mustKnow) &&
      areAllKeysNotEmpty(responsibilities) &&
      areAllKeysNotEmpty(requirements) &&
      areAllKeysNotEmpty(skills)
    ) {
      if (item) {
        dispatch(
          patchVacancy({
            vacancy: vacancyTitle,
            department,
            mustKnow,
            responsibilities,
            requirements,
            skills,
            id: item?.id,
          })
        );
      } else {
        dispatch(
          sendVacancy({
            vacancy: vacancyTitle,
            department,
            mustKnow,
            responsibilities,
            requirements,
            skills,
          })
        );
      }
    }
    setOpenModal(false);
  };
  const handleDelete = () => {
    dispatch(deleteVacancy({ id: item?.id }));
    setOpenModal(false);
  };
  return (
    <>
      {item ? (
        <Wrapper onClick={handleClick}>
          <Department>{item?.department_ru}</Department>
          <Title>{item?.vacancy_ru}</Title>
        </Wrapper>
      ) : (
        <EmptyHolder onClick={handleClick}>
          <p>Добавить новое</p>
          <PlusSign />
        </EmptyHolder>
      )}
      {openModal && (
        <Design
          titleText="Вакансия"
          item={{
            title: vacancyTitle,
            smallDescription: department,
            mustKnow,
            responsibilities,
            requirements,
            skills,
            isTitleInput: true,
            mainText: "Название вакансии",
            shortDesc: "Отдел",
          }}
          canBePublished={
            areAllKeysNotEmpty(vacancyTitle) &&
            areAllKeysNotEmpty(department) &&
            areAllKeysNotEmpty(mustKnow) &&
            areAllKeysNotEmpty(responsibilities) &&
            areAllKeysNotEmpty(requirements) &&
            areAllKeysNotEmpty(skills)
          }
          setText={setVacancyTitle}
          setSmallDescription={setDepartment}
          setMustKnow={setMustKnow}
          setResponsibilities={setResponsibilities}
          setRequirements={setRequirements}
          setSkills={setSkills}
          onClose={handleClick}
          handlePublish={handlePublish}
          onDelete={handleDelete}
          isNew={!item}
          isPhoto={false}
        />
      )}
    </>
  );
};
