import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import EditProfile from './pages/EditProfile';
import LandingPage from './pages/LandingPage';
import Profile from './pages/Profile';
import Register from './pages/Register';
import Swipe from './pages/Recommendations/Recommendations';
import { AuthorizeUserRoute } from './ProtectedRoutes';
import { RoleID } from './types/user';
import Matches from './pages/Matches';
import Gifts from './pages/Gifts';
import BuyGift from './pages/BuyGift';
import GiftBag from './pages/GiftBag';

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
          <Route
            path="matches"
            element={
              <Layout>
                <Matches />
              </Layout>
            }
          />
          <Route
            path="gifts"
            element={
              <Layout>
                <Gifts />
              </Layout>
            }
          />
          <Route
            path="gifts/buy"
            element={
              <Layout>
                <BuyGift />
              </Layout>
            }
          />
          <Route
            path="gifts/bag"
            element={
              <Layout>
                <GiftBag />
              </Layout>
            }
          />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
