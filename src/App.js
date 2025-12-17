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

// tạo biến toàn cục API sử dụng trong toàn bộ componet
export const API = "https://yngg8z-8081.csb.app";

const App = (props) => {
  const [user, setUser] = useState(null);

  function ProtectedRoute({ user, children }) {
    if (!user) {
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
              <ProtectedRoute user={user}>
                <UserList />{" "}
              </ProtectedRoute>
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

                <Route
                  path="/users"
                  element={
                    <ProtectedRoute user={user}>
                      <UserList />{" "}
                    </ProtectedRoute>
                  }
                />

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
