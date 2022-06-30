import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import ReactLoader from './components/loader';
import UserContext from './context/user';
import useAuthListener from './hooks/use-auth-listener';
import Login from "./pages/login"



export default function App() {
  const { user } = useAuthListener();

  return (
    <UserContext.Provider value={{ user }}>
      <Router>
        <Suspense fallback={<ReactLoader />}>
          <Routes >
            <Route path="/login" element={<Login />} />          
          </Routes >
        </Suspense>
      </Router>
    </UserContext.Provider>
  );
}