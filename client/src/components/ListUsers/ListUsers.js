import React, { useState, useEffect } from "react";
import {
  Button,
  Fab,
  Grow,
  Grid,
  GridList,
  GridListTile,
  GridListTileBar,
  Slider,
  Drawer,
  List,
  Card,
  CardContent,
  Divider,
  IconButton,
} from "@material-ui/core";
import "./ListUsers.scss";

import axios from "axios";

axios.defaults.baseURL = "http://localhost:5000/api/v1";

export const ListUsers = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const { data } = await axios.get("/user");
    if (data) setUsers(data);
    return;
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="listUsers__body">
      {users?.map((user, index) => {
        return (
          <Card key={index} className="listusers__card">
            <CardContent>
              <img className="imgProfile" src={user.imgProfile} alt="" />
            </CardContent>
            <CardContent>
              <p>{user.username}</p>
              <p>{user.language}</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
export default ListUsers;
