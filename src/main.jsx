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
import SignUpBasic from './pages/Signup/SignUpBasic.jsx';
import SignUpAddress from './pages/Signup/SignUpAddress.jsx';
import VerifyEmail from './pages/Signup/VerifyEmail.jsx';
import Dashboard from './pages/Dashboard.jsx';
import UserState from './context/users/UserState.jsx';
import CreateAuctionBasic from './pages/CreateAuction/CreateAuctionBasic.jsx';
import CreateAuctionPrice from './pages/CreateAuction/CreateAuctionPrice.jsx';
import CreateAuctionSchedule from './pages/CreateAuction/CreateAuctionSchedule.jsx';
import CreateAuctionUpload from './pages/CreateAuction/CreateAuctionUpload.jsx';
import ConfirmDetails from './pages/CreateAuction/ConfirmDetails.jsx';
import Success from './pages/CreateAuction/Success.jsx';
import AuctionDetails from './pages/AuctionDetails/AuctionDetails.jsx';
import CoverImage from './pages/CreateAuction/CoverImage.jsx';
import WaitingRoom from './pages/WaitingRoom.jsx';
import Stage from './pages/Stage.jsx';
import AuctionReport from './pages/AuctionReport.jsx';

const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <SignUpBasic /> },
  { path: '/signup/address', element: <SignUpAddress /> },
  { path: '/signup/verify-email', element: <VerifyEmail /> },
  { path: '/dashboard', element: <Dashboard /> },
  { path: '/create', element: <CreateAuctionBasic /> },
  { path: '/create/price-details', element: <CreateAuctionPrice /> },
  { path: '/create/schedule', element: <CreateAuctionSchedule /> },
  { path: '/create/cover', element: <CoverImage /> },
  { path: '/create/upload', element: <CreateAuctionUpload /> },
  { path: '/create/confirm', element: <ConfirmDetails /> },
  { path: '/create/success', element: <Success /> },
  { path: "/auction/:id", element: <AuctionDetails /> },
  { path: "/auction/waiting-room/:id", element: <WaitingRoom /> },
  { path: "/auction/stage/:id", element: <Stage /> },
  { path: "/auction/report/:id", element: <AuctionReport /> },
  { path: '*', element: <div>404</div> },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserState>
      <RouterProvider router={router} />
    </UserState>
  </React.StrictMode>,
)
