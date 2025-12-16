import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import { useLocation, Link } from "react-router-dom";
import { getData, handleData } from "../../modelData/api.js";

import "./styles.css";

/**
 * Define TopBar, a React component.
 */
function TopBar({ st }) {
  const location = useLocation();
  const [contextText, setContextText] = useState("");

  async function updateContextText() {
    const loc = location.pathname.split("/");
    if (loc.length < 3) return;

    const data = loc[1];
    const params = loc[2];
    const path = "https://rk43xg-8081.csb.app/api/users/" + params;

    try {
      const userData = await getData(path);
      if (data === "users") {
        setContextText(
          `Detail of User: ${userData.first_name} ${userData.last_name}`
        );
      } else if (data === "photos") {
        setContextText(
          `Photos of: ${userData.first_name} ${userData.last_name}`
        );
      } else {
        setContextText("");
      }
    } catch (error) {
      console.log("Error fetch user:", error);
    }
  }

  useEffect(() => {
    updateContextText();
    console.log("test: " + st);
  }, [location]);

  return (
    <AppBar className="topbar-appBar" position="fixed">
      <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" color="inherit">
          <Link to="/users">{"Đỗ Đức Chính"}</Link>
        </Typography>

        <Typography variant="h6" color="inherit">
          {contextText}
        </Typography>

        <Typography variant="h6" color="inherit">
          {st == null ? (
            <Link to="/login">Login</Link>
          ) : (
            <Typography variant="h6" color="inherit">
              {"Hi: " + st.first_name + "   "}
              <Link to="/logout">Logout</Link>
            </Typography>
          )}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
