import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

export const TwoFactorAuth = () => {
  const isErrorWithMessage = (error: unknown): error is { message: string } => {
    return typeof error === 'object' && error !== null && 'message' in error;
  };

  const [code, setCode] = useState('');
  const location = useLocation();
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // Username is passed via state in the location object from the previous page
    if (location.state && location.state.username) {
      setUsername(location.state.username);
    } else {
      setError('Username not found. Please try again.');
    }
  }, [location.state]);

  // Handle the submission. Declare type for the event - react form element.
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    try {
      const response = await axios.post(
        `${backendUrl}/auth/verify2fa`,
        { username, code },
        { withCredentials: true }
      );

      if (response.data.success) {
        alert('Login Successful');
      } else {
        setError('Invalid code. Try again.');
      }
    } catch (error: unknown) {
      if (isErrorWithMessage(error)) setError(`Error: ${error.message}`);
    }
  };

  return (
    <div>
      <div className="menu_header" />
      <h1>Two Factor Authentication</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {/* This is the React form element that has this type: <HTMLFormElement>. React.FormEvent wraps the form */}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Code: </label>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
        </div>
        <div className="form-button-holder">
          <button type="submit">Verify</button>
        </div>
      </form>
    </div>
  );
};