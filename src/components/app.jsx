import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

// pages

import "react-lazy-load-image-component/src/effects/blur.css";
import Explore from "../pages/explore";
import Home from "../pages/home";
import Login from "../pages/login";
import Profile from "../pages/profile";
import Signup from "../pages/signup";
import Post from "../pages/post";
import Reels from "../pages/reels";

const RequireAuth = ({ children }) => {
  const { user } = useContext(AuthContext);
  return user ? children : <Navigate to="/login" replace />;
};

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <RequireAuth>
                <Home />
              </RequireAuth>
            }
          />
          <Route
            path="/explore"
            element={
              <RequireAuth>
                <Explore />
              </RequireAuth>
            }
          />
          <Route
            path="/reels"
            element={
              <RequireAuth>
                <Reels />
              </RequireAuth>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/p/:id" element={<Post />} />
          <Route path="/:username" element={<Profile />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
