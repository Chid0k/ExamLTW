import React from "react";
import { Divider, Typography } from "@mui/material";
import "./styles.css";
import { useParams } from "react-router-dom";
import { getData, handleData } from "../../modelData/api.js";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { API } from "../../App.js";

/**
 * Define UserPhotos, a React component of Project 4.
 */
function UserPhotos() {
  const user = useParams();
  const [photos, setPhotos] = useState([]);
  const [comment, setComment] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [status, setStatus] = useState("Loading ...");
  const navigate = useNavigate();

  useEffect(() => {
    setStatus("Loading ...");
    setRefresh(false);
    getData(API + "/api/photos/" + user.userId)
      .then((data) => {
        setPhotos(data);
        setStatus("OK");
      })
      .catch((err) => {
        console.log(err);
        navigate("/login");
      });
  }, [user, refresh]);


  function submitComment(e, photoId) {
    e.preventDefault();
    const commentData = {
        comment: comment
      };
    handleData(API + "/api/comment/commentsOfPhoto/" + photoId, "POST", commentData)
      .then((data) => {
        setRefresh(true);
        setComment("");
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
    });
}

  function addComment(photoId) {
    const addCmtView = [];
    addCmtView.push(<h3>Add Comment:</h3>);
    addCmtView.push(
      <form onSubmit={(e) => submitComment(e, photoId)}>
        <label>Comment:</label>
        <input
          type="text"
          name="comment"
          onChange={(e) => setComment(e.target.value)}
        />
        <button type="submit">Add Comment</button>
      </form>
    );
    return addCmtView;
  }

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
            API + "/api/photos/photo/" + photo.file_name
          }
        ></img>
      );
      viewP.push(viewComment(photo.comments));
      viewP.push(addComment(photo._id));
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
