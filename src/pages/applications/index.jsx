import React, { useEffect } from "react";
import { HR, SUPERADMIN } from "../../constants";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CORRECT_ROLES = [SUPERADMIN, HR];

const Applications = () => {
  const navigate = useNavigate();
  // useEffect(() => {
  //   if (!CORRECT_ROLES.includes(role)) {
  //     navigate("/not-found");
  //   }
  // }, [role, navigate]);
  return <div>Applications</div>;
};

export default Applications;
