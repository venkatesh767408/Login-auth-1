import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../App.css';

const Login = () => {
  const navigate = useNavigate();

  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: ''
  });

  const handleError = (msg) => toast.error(msg);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setLoginInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const { email, password } = loginInfo;
    if (!email || !password) {
      return handleError('Both fields are required');
    }

    try {
      const response = await fetch('https://login-auth-1-api.vercel.app/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginInfo),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Login successful!');
        // Save token in localStorage
        localStorage.setItem('token', data.token);

        setTimeout(() => {
          navigate('/Home'); // Redirect to home page
        }, 1000);
      } else {
        handleError(data.message || 'Login failed');
      }
    } catch (err) {
      handleError('Network/server error');
      console.error(err);
    }
  };

  // Check if the user is already logged in
  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/Home'); // Redirect to home page if logged in
    }
  }, [navigate]);

  return (
    <div className='signup-container'>
      <form className='signup-form' onSubmit={handleLogin}>
        <h1 className='form-title'>Login</h1>

        <div className='form-group'>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            name='email'
            value={loginInfo.email}
            onChange={handleInput}
            autoFocus
            placeholder='Enter your email'
          />
        </div>

        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            name='password'
            value={loginInfo.password}
            onChange={handleInput}
            placeholder='Enter your password'
          />
        </div>

        <button className='signup-btn' type='submit'>Login</button>

        <p className='login-redirect'>
          Don't have an account? <Link to='/signup'>Sign Up</Link>
        </p>
      </form>

      <ToastContainer />
    </div>
  );
};

export default Login;
