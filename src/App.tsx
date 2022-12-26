import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Register from './pages/Register';
import Swipe from './pages/Swipe/Swipe';
import { AuthorizeUserRoute } from './ProtectedRoutes';
import { RoleID } from './types/user';

function App(): JSX.Element {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<LandingPage />} />
        <Route path="register" element={<Register />} />
        <Route element={<AuthorizeUserRoute allowedRole={RoleID.User} />}>
          <Route path="app" element={<Swipe />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
