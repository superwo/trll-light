import React, { useState, useContext } from 'react';
import Button from '../components/Button';
import useForm from '../hooks/useForm';
import validate from '../utils/LoginFormValidationRules';
import { UserContext } from '../contexts/userContext';
import { Redirect } from 'react-router-dom';
import { loginUser } from '../services/auth';

import './Login.css';

function Login() {
  const { login, isLoggedIn } = useContext(UserContext);
  const [loginError, setLoginError] = useState('');

  const { values, errors, handleChange, handleSubmit } = useForm(
    authSubmitHandler,
    validate
  );

  async function authSubmitHandler() {
    try {
      setLoginError('');
      const userData = await loginUser(values);
      login(userData.userId, userData.name, userData.token);
    } catch (err) {
      console.log(err.message);
      setLoginError(err.message || 'Login Failed. Try again');
    }
  }
  if (isLoggedIn) {
    return <Redirect to='/' />;
  }

  return (
    <section className='login'>
      <div className='box'>
        <h3 className='login-title'>Log in</h3>
        <form onSubmit={handleSubmit} noValidate autoComplete='off'>
          <div className='control'>
            <input
              autoComplete='off'
              className={`input ${errors.email && 'is-danger'}`}
              type='email'
              name='email'
              onChange={handleChange}
              value={values.email || ''}
              placeholder='Enter email'
              required
            />
            {errors.email && <p className='help is-danger'>{errors.email}</p>}
          </div>
          <div className='control'>
            <input
              className={`input ${errors.password && 'is-danger'}`}
              type='password'
              name='password'
              onChange={handleChange}
              placeholder='Enter password'
              value={values.password || ''}
              required
            />
            {errors.password && (
              <p className='help is-danger'>{errors.password}</p>
            )}
          </div>
          <Button type='submit' classes='btn-full,btn-green'>
            Login
          </Button>
          <br />
          <p className='help is-danger'>{loginError}</p>
        </form>
      </div>
    </section>
  );
}

export default Login;
