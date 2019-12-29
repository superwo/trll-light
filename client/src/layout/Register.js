import React, { useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';
import Button from '../components/Button';
import useForm from '../hooks/useForm';
import validate from '../utils/RegisterFormValidation';
import { UserContext } from '../contexts/userContext';
import { registerUser } from '../services/auth';

import './Login.css';

function Register() {
  const [errorMessage, setErrorMessage] = useState('');
  const { login, userId } = useContext(UserContext);

  const { values, errors, handleChange, handleSubmit } = useForm(
    authSubmitHandler,
    validate
  );

  async function authSubmitHandler() {
    try {
      const userData = await registerUser(values);
      console.log(userData);
      login(userData.userId, userData.name, userData.token);
    } catch (err) {
      console.log(err);
      setErrorMessage('Registration failed. Try again.');
    }
  }

  if (userId) {
    return <Redirect to='/' />;
  }

  return (
    <section className='login'>
      <div className='box'>
        <h3 className='login-title'>Register</h3>
        <form onSubmit={handleSubmit} noValidate autoComplete='off'>
          <div className='control'>
            <input
              autoComplete='off'
              className={`input ${errors.name && 'is-danger'}`}
              type='text'
              name='name'
              onChange={handleChange}
              value={values.name || ''}
              placeholder='Enter name'
              required
            />
            {errors.name && <p className='help is-danger'>{errors.name}</p>}
          </div>
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
            Register
          </Button>
          <br />
          {errorMessage && <p className='help is-danger'>{errorMessage}</p>}
        </form>
      </div>
    </section>
  );
}

export default Register;
