import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import EditProfile from './pages/EditProfile';
import LandingPage from './pages/LandingPage';
import Profile from './pages/Profile';
import Register from './pages/Register';
import Swipe from './pages/Recommendations/Recommendations';
import { AuthorizeRoleRoute, GuardAuthPage } from './ProtectedRoutes';
import { RoleID } from './types/user';
import Matches from './pages/Matches';
import Gifts from './pages/Gifts';
import BuyGift from './pages/BuyGift';
import GiftBag from './pages/GiftBag';
import ScheduleMeetUp from './pages/ScheduleMeetUp/ScheduleMeetUp';
import MeetUp from './pages/MeetUp';
import AdminLayout from './pages/AdminPanel/Layout';
import AdminPanel from './pages/AdminPanel';
import VenueVouchersPage from './pages/AdminPanel/VenueVouchersPage';

function App(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<GuardAuthPage />}>
        <Route index element={<LandingPage />} />
        <Route path="register" element={<Register />} />
      </Route>
      <Route
        path="/app"
        element={<AuthorizeRoleRoute allowedRole={RoleID.User} />}
      >
        <Route index element={<Navigate to="/app/recommendations" replace />} />
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
        <Route
          path="profile/edit"
          element={
            <Layout>
              <EditProfile />
            </Layout>
          }
        />
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
        <Route
          path="meet-up"
          element={
            <Layout>
              <MeetUp />
            </Layout>
          }
        />
        <Route
          path="meet-up/schedule"
          element={
            <Layout>
              <ScheduleMeetUp />
            </Layout>
          }
        />
        <Route
          path="meet-up/re-schedule"
          element={
            <Layout>
              <ScheduleMeetUp />
            </Layout>
          }
        />
      </Route>
      <Route
        path="/admin"
        element={<AuthorizeRoleRoute allowedRole={RoleID.Admin} />}
      >
        <Route index element={<Navigate to="/admin/venues" replace />} />
        <Route
          path="venues"
          element={
            <AdminLayout>
              <AdminPanel />
            </AdminLayout>
          }
        />
        <Route
          path="venues/:venueId/vouchers"
          element={
            <AdminLayout>
              <VenueVouchersPage />
            </AdminLayout>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
