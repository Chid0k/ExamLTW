import React from "react";
import { Divider, Typography } from "@mui/material";
import "./styles.css";
import { useParams } from "react-router-dom";
import { getData, handleData } from "../../modelData/api.js";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

/**
 * Define UserPhotos, a React component of Project 4.
 */
function UserPhotos() {
  const user = useParams();
  const [photos, setPhotos] = useState([]);
  const [status, setStatus] = useState("Loading ...");

  useEffect(() => {
    setStatus("Loading ...");
    console.log(user.userId);
    getData("https://rk43xg-8081.csb.app/api/photos/" + user.userId)
      .then((data) => {
        setPhotos(data);
        setStatus("OK");
      })
      .catch((err) => {
        console.log(err);
        setStatus("ERROR");
      });
  }, [user]);

  function viewComment(comments) {
    const viewC = [];
    viewC.push(<h3>Comments:</h3>);
    if (comments.length === 0) {
      viewC.push(<p>No Comment</p>);
      return viewC;
    }
    comments.forEach((cmt) => {
      viewC.push(
        <h4>User{": " + cmt.user.first_name + " " + cmt.user.last_name}</h4>
      );
      viewC.push(<h5>Time{": " + cmt.date_time}</h5>);
      viewC.push(
        <ul>
          <li>Comment{" : " + cmt.comment}</li>
        </ul>
      );
    });
    return viewC;
  }

  function viewPhoto() {
    const viewP = [];
    photos.forEach((photo) => {
      viewP.push(<Divider />);
      viewP.push(<h2> {"Photo id: " + photo._id} </h2>);
      viewP.push(<p> Times{": " + photo.date_time} </p>);
      viewP.push(
        <img
          src={
            "https://rk43xg-8081.csb.app/api/photos/photo/" + photo.file_name
          }
        ></img>
      );
      viewP.push(viewComment(photo.comments));
      viewP.push(<br />);
    });
    return viewP;
  }

  return (
    <Typography variant="body1">
      This should be the UserPhotos view of the PhotoShare app. Since it is
      invoked from React Router the params from the route will be in property
      match. So this should show details of user:
      {user.userId}. You can fetch the model for the user from
      models.photoOfUserModel(userId):
      <br />
      <Divider />
      <br />
      {status === "OK" ? viewPhoto() : status}
    </Typography>
  );
}

export default UserPhotos;
