import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

export const ActivateUser = () => {
  const url = useLocation();

  useEffect(() => {
    axios.post("user/activateUser", url);
  }, []);
  return <div></div>;
};
export default ActivateUser;
