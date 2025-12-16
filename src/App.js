import "./App.css";

import React from "react";
import { useState } from "react";
import { Grid, Typography, Paper } from "@mui/material";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import TopBar from "./components/TopBar";
import UserDetail from "./components/UserDetail";
import UserList from "./components/UserList";
import UserPhotos from "./components/UserPhotos";
import { Login, Logout } from "./components/LoginRegister";

const App = (props) => {
  const [user, setUser] = useState(null);

  function ProtectedRoute({ user, children }) {
    if (!user) {
      alert("401 Unauthorize");
      return <Navigate to="/login" replace />;
    }
    return children;
  }

  return (
    <Router>
      <div>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TopBar st={user} />
          </Grid>
          <div className="main-topbar-buffer" />
          <Grid item sm={3}>
            <Paper className="main-grid-item">
              <UserList />
            </Paper>
          </Grid>

          <Grid item sm={9}>
            <Paper className="main-grid-item">
              <Routes>
                <Route
                  path="/users/:userId"
                  element={
                    <ProtectedRoute user={user}>
                      <UserDetail />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/photos/:userId"
                  element={
                    <ProtectedRoute user={user}>
                      <UserPhotos />
                    </ProtectedRoute>
                  }
                />

                <Route path="/users" element={<UserList />} />

                <Route path="/login" element={<Login onLogin={setUser} />} />
                <Route path="/logout" element={<Logout onLogout={setUser} />} />
              </Routes>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </Router>
  );
};

export default App;
