import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export const useGetInfo = ({ selector, fetcher }) => {
  const { fetched, loading } = useSelector(selector);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!fetched && !loading) {
      dispatch(fetcher());
    }
  }, [fetched, dispatch, loading]);
};
