import React, { useEffect } from "react";
import { HR, SUPERADMIN } from "../../constants";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getUser } from "../../store";

const CORRECT_ROLES = [SUPERADMIN, HR];

const Vacancies = () => {
  const navigate = useNavigate();
  const { role } = useSelector(getUser);
  useEffect(() => {
    if (!CORRECT_ROLES.includes(role)) {
      navigate("/not-found");
    }
  }, [role, navigate]);
  return <div>Vacancies</div>;
};

export default Vacancies;
