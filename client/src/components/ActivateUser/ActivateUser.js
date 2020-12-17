import React, { useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import axios from "axios";

export const ActivateUser = () => {
  const history = useHistory();
  const url = useLocation();
  useEffect(() => {
    axios.post("user/activateUser", url).then((data) => {
      console.log(data);
      history.push("/");
    });
  }, []);

  return <div></div>;
};
export default ActivateUser;
