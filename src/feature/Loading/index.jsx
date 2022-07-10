import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeLoading } from "store/common.reducer";

import "./styles.css";

export const Loading = () => {
  const { loading } = useSelector((s) => s.common);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(closeLoading());
  }, []);

  console.log(loading);
  return (
    <div
      style={{
        display: !loading ? "none" : "",
      }}
    >
      <div className="lds-roller-overlay" />
      <div className="lds-ripple">
        <div className="loader"></div>
      </div>
    </div>
  );
};
