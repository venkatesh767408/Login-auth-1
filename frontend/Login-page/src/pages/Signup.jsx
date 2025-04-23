import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // ✅ Import useNavigate
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../App.css';

const Signup = () => {
  const navigate = useNavigate(); // ✅ Create navigate function

  const [signinfo, setSigninfo] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleError = (msg) => {
    toast.error(msg);
  };

  const handleinput = (e) => {
    const { name, value } = e.target;
    setSigninfo((prev) => ({ ...prev, [name]: value }));
  };

  const handlesignverify = async (e) => {
    e.preventDefault();

    const { name, email, password } = signinfo;
    if (!name || !email || !password) {
      return handleError("All fields must be filled");
    }

    try {
      const response = await fetch('https://login-auth-1-api.vercel.app/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(signinfo)
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Signup successful! Redirecting...');
        console.log('Signup successful:', data);

        setTimeout(() => {
          navigate('/home'); // ✅ Redirect to login page
        }, 1500); // Slight delay for user to see the success toast
      } else {
        handleError(data.message || "Signup failed");
        console.error('Signup failed:', data.message);
      }
    } catch (err) {
      handleError("Network/server error");
      console.error('Error occurred:', err);
    }
  };

  return (
    <div className='signup-container'>
      <form className='signup-form' onSubmit={handlesignverify}>
        <h1 className='form-title'>Sign Up</h1>

        <div className='form-group'>
          <label htmlFor='name'>Name</label>
          <input
            type='text'
            name='name'
            value={signinfo.name}
            onChange={handleinput}
            autoFocus
            placeholder='Enter your name'
          />
        </div>

        <div className='form-group'>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            name='email'
            value={signinfo.email}
            onChange={handleinput}
            placeholder='Enter your email'
          />
        </div>

        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            name='password'
            value={signinfo.password}
            onChange={handleinput}
            placeholder='Enter your password'
          />
        </div>

        <button className='signup-btn' type='submit'>Sign Up</button>

        <p className='login-redirect'>
          Already have an account? <Link to='/login'>Login</Link>
        </p>
      </form>

      <ToastContainer />
    </div>
  );
};

export default Signup;
