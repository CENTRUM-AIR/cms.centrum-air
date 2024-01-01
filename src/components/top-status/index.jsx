import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStatus } from "../../store";
import { removeStatus } from "../../store/notifs";
import { ReactComponent as Close } from "../../icons/close.svg";
import { TopStatusWrapperError, TopStatusWrapperSuccess } from "./styled";

export const TopStatus = () => {
  const dispatch = useDispatch();
  const [isShow, setIsShow] = useState(false);
  const { message, isError, isSuccess } = useSelector(getStatus);
  useEffect(() => {
    if (message) {
      setIsShow(true);
      setTimeout(() => {
        setIsShow(false);
        dispatch(removeStatus());
      }, 3000);
    }
  }, [message, isError, dispatch, isSuccess]);

  return (
    isShow && (
      <>
        {isError ? (
          <TopStatusWrapperError>
            <p>{message}</p>
            <div style={{ cursor: "pointer" }} onClick={() => setIsShow(false)}>
              <Close />
            </div>
          </TopStatusWrapperError>
        ) : (
          <TopStatusWrapperSuccess>
            <p>{message}</p>
            <div style={{ cursor: "pointer" }} onClick={() => setIsShow(false)}>
              <Close />
            </div>
          </TopStatusWrapperSuccess>
        )}
      </>
    )
  );
};
