import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Login } from './Login/Login';
import { TwoFactorAuth } from './Login/2fa';

import Menu from './Menu/Menu.tsx';

import './App.css';

// app for fetch calls implemented from: https://jasonwatmore.com/post/2020/01/27/react-fetch-http-get-request-examples

export const AppRouter = () => (
  <Router>
    <Routes>
      <Route path="/" Component={Login} />
      <Route path="/login/2fa" Component={TwoFactorAuth} />
      <Route path="/menu" Component={Menu} />
    </Routes>
  </Router>
);