import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import EditProfile from './pages/EditProfile';
import LandingPage from './pages/LandingPage';
import Profile from './pages/Profile';
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
        <Route
          path="app"
          element={<AuthorizeUserRoute allowedRole={RoleID.User} />}
        >
          <Route
            index
            element={<Navigate to="/app/recommendations" replace />}
          />
          <Route
            path="recommendations"
            element={
              <Layout>
                <Swipe />
              </Layout>
            }
          />
          <Route
            path="profile"
            element={
              <Layout>
                <Profile />
              </Layout>
            }
          />
          <Route path="profile/edit" element={<EditProfile />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
