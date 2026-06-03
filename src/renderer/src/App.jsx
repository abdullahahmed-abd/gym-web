import React, { createContext, useContext, useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { PlansProvider } from './context/PlansContext';

// Landing Page (Sabse pehle dikhega)
import LandingPage from '../../landingpage/Landingpage'
import AdminUpgrade from './screens/Upgrade/AdminUpgrade';
// Auth Screens
import Login from './screens/Auth/Login';
import Register from './screens/Auth/Register';

// Admin Screens
import AdminDashboard from './screens/Dashboard/AdminDashboard';
import AdminPlans from './screens/Plans/AdminPlans';
import AdminAddPlan from './screens/Plans/AdminAddPlan';
import AdminExpenses from './screens/Finance/AdminExpenses';
import AdminLiveRoster from './screens/LiveRoster/AdminLiveRoster';
import AdminUsersDetail from './screens/Members/AdminUsersDetail';
import AdminTrainers from './screens/Trainers/AdminTrainers';
import AdminSettings from './screens/Settings/AdminSettings';

import MembersProfile from './screens/Members/MembersProfile';
import AdminSeeUserProfile from './screens/LiveRoster/AdminSeeUserProfile';

import AdminAddTrainer from './screens/Trainers/AdminAddTrainer';
import AdminTrainerProfile from './screens/Trainers/AdminTrainerProfile';
import TrainerAttendanceLog from './screens/Trainers/TrainerAttendanceLog';
import TrainerDetail from './screens/Trainers/TrainerDetail';
import AdminDeviceManagement from './screens/Dashboard/AdminDeviceManagement';

// ─── Auth Context ────────────────────────────────────────────────────────────

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used inside AuthContext.Provider');
  }

  return context;
};

// ─── Protected Route ─────────────────────────────────────────────────────────

const ProtectedRoute = ({ isLoggedIn, children }) => {
  return isLoggedIn ? children : <Navigate to="/login" replace />;
};

// ─── App ─────────────────────────────────────────────────────────────────────

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem('gym_admin_logged_in') === 'true'
  );

  const [adminData, setAdminData] = useState(() => {
    try {
      const saved = localStorage.getItem('gym_admin_data');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    const syncAuth = () => {
      setIsLoggedIn(
        localStorage.getItem('gym_admin_logged_in') === 'true'
      );

      try {
        const saved = localStorage.getItem('gym_admin_data');
        setAdminData(saved ? JSON.parse(saved) : null);
      } catch {
        setAdminData(null);
      }
    };

    window.addEventListener('storage', syncAuth);

    return () => {
      window.removeEventListener('storage', syncAuth);
    };
  }, []);

  const handleLogin = (data) => {
    const payload = data || {
      email: 'admin@gym.com',
      name: 'Admin',
    };

    setAdminData(payload);
    setIsLoggedIn(true);

    localStorage.setItem('gym_admin_logged_in', 'true');
    localStorage.setItem('gym_admin_data', JSON.stringify(payload));
  };

  const handleLogout = () => {
    setAdminData(null);
    setIsLoggedIn(false);

    localStorage.removeItem('gym_admin_logged_in');
    localStorage.removeItem('gym_admin_data');
  };

  const sharedProps = {
    onLogout: handleLogout,
    adminData,
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        adminData,
        handleLogin,
        handleLogout,
      }}
    >
      <PlansProvider>
        <Router>
          <Routes>

            {/* ══════════════════════════════════════════════════════════════ */}
            {/*  LANDING PAGE — Sabse pehle dikhega                          */}
            {/* ══════════════════════════════════════════════════════════════ */}

            <Route
              path="/"
              element={
                isLoggedIn ? (
                  <Navigate to="/dashboard" replace />
                ) : (
                  <LandingPage />
                )
              }
            />

            {/* ══════════════════════════════════════════════════════════════ */}
            {/*  AUTH — Login & Register                                      */}
            {/* ══════════════════════════════════════════════════════════════ */}

            <Route
              path="/login"
              element={
                isLoggedIn ? (
                  <Navigate to="/dashboard" replace />
                ) : (
                  <Login onLogin={handleLogin} />
                )
              }
            />

            <Route
              path="/register"
              element={
                isLoggedIn ? (
                  <Navigate to="/dashboard" replace />
                ) : (
                  <Register />
                )
              }
            />

            {/* ══════════════════════════════════════════════════════════════ */}
            {/*  DASHBOARD                                                    */}
            {/* ══════════════════════════════════════════════════════════════ */}

            <Route
              path="/dashboard"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <AdminDashboard {...sharedProps} />
                </ProtectedRoute>
              }
            />

            {/* ══════════════════════════════════════════════════════════════ */}
            {/*  PLANS                                                        */}
            {/* ══════════════════════════════════════════════════════════════ */}

            <Route
              path="/plans"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <AdminPlans {...sharedProps} />
                </ProtectedRoute>
              }
            />

            <Route
              path="/plans/add"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <AdminAddPlan {...sharedProps} />
                </ProtectedRoute>
              }
            />

            {/* ══════════════════════════════════════════════════════════════ */}
            {/*  EXPENSES                                                     */}
            {/* ══════════════════════════════════════════════════════════════ */}

            <Route
              path="/expenses"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <AdminExpenses {...sharedProps} />
                </ProtectedRoute>
              }
            />

            {/* ══════════════════════════════════════════════════════════════ */}
            {/*  LIVE ROSTER                                                  */}
            {/* ══════════════════════════════════════════════════════════════ */}

            <Route
              path="/live-roster"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <AdminLiveRoster {...sharedProps} />
                </ProtectedRoute>
              }
            />

            <Route
              path="/member-view"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <AdminSeeUserProfile {...sharedProps} />
                </ProtectedRoute>
              }
            />

            {/* ══════════════════════════════════════════════════════════════ */}
            {/*  MEMBERS                                                      */}
            {/* ══════════════════════════════════════════════════════════════ */}

            <Route
              path="/members"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <AdminUsersDetail {...sharedProps} />
                </ProtectedRoute>
              }
            />

            <Route
              path="/member-profile"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <MembersProfile {...sharedProps} />
                </ProtectedRoute>
              }
            />

            {/* ══════════════════════════════════════════════════════════════ */}
            {/*  TRAINERS                                                     */}
            {/* ══════════════════════════════════════════════════════════════ */}

            <Route
              path="/trainers"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <AdminTrainers {...sharedProps} />
                </ProtectedRoute>
              }
            />

            <Route
              path="/add-trainer"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <AdminAddTrainer {...sharedProps} />
                </ProtectedRoute>
              }
            />

            <Route
              path="/trainer-profile"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <AdminTrainerProfile {...sharedProps} />
                </ProtectedRoute>
              }
            />

            <Route
              path="/trainer-detail"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <TrainerDetail {...sharedProps} />
                </ProtectedRoute>
              }
            />

            <Route
              path="/trainer-attendance-log"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <TrainerAttendanceLog {...sharedProps} />
                </ProtectedRoute>
              }
            />

            {/* ══════════════════════════════════════════════════════════════ */}
            {/*  SETTINGS                                                     */}
            {/* ══════════════════════════════════════════════════════════════ */}

            <Route
              path="/settings"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <AdminSettings {...sharedProps} />
                </ProtectedRoute>
              }
            />

            {/* ══════════════════════════════════════════════════════════════ */}
            {/*  DEVICE MANAGEMENT                                            */}
            {/* ══════════════════════════════════════════════════════════════ */}

            <Route
              path="/device-management"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <AdminDeviceManagement {...sharedProps} />
                </ProtectedRoute>
              }
            />
<Route
              path="/upgrade"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <AdminUpgrade {...sharedProps} />
                </ProtectedRoute>
              }
            />

            {/* ══════════════════════════════════════════════════════════════ */}
            {/*  FALLBACK — Unknown routes                                    */}
            {/* ══════════════════════════════════════════════════════════════ */}

            <Route
              path="*"
              element={
                <Navigate
                  to={isLoggedIn ? '/dashboard' : '/'}
                  replace
                />
              }
            />

          </Routes>
        </Router>
      </PlansProvider>
    </AuthContext.Provider>
  );
}

export default App;