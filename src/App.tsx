import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MultiStepForm from './components/MultiStepForm/MultiStepForm';
import LandingPage from './pages/LandingPage';
import Swipe from './pages/Swipe/Swipe';
import ProtectedRoutes from './ProtectedRoutes';
import { RoleID } from './types/user';

function App(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/register" element={<MultiStepForm forms={[]} />} />
      <Route element={<ProtectedRoutes allowedRole={RoleID.User} />}>
        <Route path="/app">
          <Route index element={<Swipe />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
