// src/components/admin/AdminDashboard.jsx
import { useState } from 'react'
import Sidebar from './Sidebar'
import DashboardHome from './pages/DashboardHome'
import MembersPage from './pages/MembersPage'
import PlansPage from './pages/PlansPage'
import TrainersPage from './pages/TrainersPage'
import ExpensesPage from './pages/ExpensesPage'
import SettingsPage from './pages/SettingsPage'

const PAGES = {
  dashboard: DashboardHome,
  members:   MembersPage,
  plans:     PlansPage,
  trainers:  TrainersPage,
  expenses:  ExpensesPage,
  settings:  SettingsPage,
}

export default function AdminDashboard({ adminData, onLogout }) {
  const [activePage, setActivePage] = useState('dashboard')

  const CurrentPage = PAGES[activePage] || DashboardHome

  return (
    <div className="flex min-h-[calc(100vh-40px)]">
      {/* Sidebar */}
      <Sidebar
        activePage={activePage}
        onPageChange={setActivePage}
        adminData={adminData}
        onLogout={onLogout}
      />

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <CurrentPage adminData={adminData} />
      </main>
    </div>
  )
}