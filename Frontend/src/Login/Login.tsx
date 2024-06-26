import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    try {
      const response = await axios.post(
        `${backendUrl}/auth/login`,
        { username, password },
        { headers: { 'Content-Type': 'application/json' } }
      );

      const data = response.data;
      if (data.waitingForCode) {
        console.log(data);
        navigate('login/2fa', { state: { username } });
      } else {
        console.log('Login failed: ', data);
        alert('Login failed');
      }
    } catch (error) {
      // @ts-expect-error: Error will have a response
      console.error(
        'Login failed:',
        error.response ? error.response.statusText : error.message
      );
      // @ts-expect-error: Error will have a response
      alert(
        'Login failed: ' +
          (error.response ? error.response.statusText : error.message)
      );
    }
  };

  return (
    <div className="login">
      <div className="menu_header" />
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="login-entries">
          <div className="login-username">
            <label htmlFor="username">Username: </label>
            <input
              id="username"
              type="text"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="login-password">
            <label htmlFor="password">Password: </label>
            <input
              id="password"
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="form-button-holder">
          <button className="login-button" type="submit">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};