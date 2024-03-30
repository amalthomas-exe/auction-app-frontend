import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Login from './pages/Login.jsx';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import Home from './pages/Home.jsx';
import SignUpBasic from './pages/SignUpBasic.jsx';
import SignUpAddress from './pages/SignUpAddress.jsx';
import VerifyEmail from './pages/VerifyEmail.jsx';
import Dashboard from './pages/Dashboard.jsx';
import UserState from './context/users/UserState.jsx';

const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <SignUpBasic /> },
  { path: '/signup/address', element: <SignUpAddress /> },
  { path: '/signup/verify-email', element: <VerifyEmail /> },
  { path: '/dashboard', element: <Dashboard /> },
  { path: '*', element: <div>404</div> },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserState>
      <RouterProvider router={router} />
    </UserState>
  </React.StrictMode>,
)
