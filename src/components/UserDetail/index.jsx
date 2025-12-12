import React from "react";
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import "./styles.css";
import { useParams } from "react-router-dom";
import { getData, handleData } from "../../modelData/api.js";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

/**
 * Define UserDetail, a React component of Project 4.
 */
function UserDetail() {
  const user = useParams(); // App.js line 30
  const [userDetail, setUserDetail] = useState([]);
  const [status, setStatus] = useState("Loading ...");

  useEffect(() => {
    setStatus("Loading ...");
    getData("https://s3n5xj-8081.csb.app/api/users/" + user.userId)
      .then((data) => {
        setUserDetail(data);
        setStatus("OK");
      })
      .catch((err) => {
        console.log(err);
        setStatus("Error");
      });
  }, [user]);

  return (
    <>
      <Typography variant="body1">
        This should be the UserDetail view of the PhotoShare app. Since it is
        invoked from React Router the params from the route will be in property
        match. So this should show details of user: {user.userId}. You can fetch
        the model for the user from models.userModel.
        <br />
        <Divider />
        <br />
        {status == "OK" ? (
          <div>
            First name{": " + userDetail.first_name}
            <br />
            Last name{": " + userDetail.last_name}
            <br />
            Location{": " + userDetail.location}
            <br />
            Description{": " + userDetail.description}
            <br />
            Occupation{": " + userDetail.occupation}
            <br />
            <Link to={"../photos/" + user.userId}>My PhotoShare</Link>
          </div>
        ) : (
          status
        )}
      </Typography>
    </>
  );
}

export default UserDetail;
