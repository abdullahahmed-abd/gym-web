// // src/App.jsx
// import { useState } from 'react'
// import TitleBar from "./assets/components/landing/TitleBar"
// import LoginPage from './assets/auth/LoginPage'
// import AdminDashboard from './assets/components/admin/AdminDashboard'

// function App() {
//   // Simple auth state (will connect to backend later)
//   const [isLoggedIn, setIsLoggedIn] = useState(false)
//   const [adminData, setAdminData] = useState(null)

//   const handleLogin = (data) => {
//     setAdminData(data)
//     setIsLoggedIn(true)
//   }

//   const handleLogout = () => {
//     setAdminData(null)
//     setIsLoggedIn(false)
//   }

//   return (
//     <div className="min-h-screen bg-black">
//       {/* Custom Title Bar */}
//       <TitleBar />

//       {/* Content - push down by title bar height */}
//       <div className="pt-10">
//         {isLoggedIn
//           ? <AdminDashboard adminData={adminData} onLogout={handleLogout} />
//           : <LoginPage onLogin={handleLogin} />
//         }
//       </div>
//     </div>
//   )
// }

// export default App