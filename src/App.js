import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom';
import ReactLoader from './components/loader';
import UserContext from './context/user';
import useAuthListener from './hooks/use-auth-listener';

const Login = lazy(() => import('./pages/login'));


export default function App() {
  const { user } = useAuthListener();

  return (
    <UserContext.Provider value={{ user }}>
      <Router>
        <Suspense fallback={<ReactLoader />}>
          <Routes >
            <Route path={'/login'} component={Login} />            
         
          </Routes >
        </Suspense>
      </Router>
    </UserContext.Provider>
  );
}