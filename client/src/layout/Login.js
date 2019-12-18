import React from 'react';
import Button from '../components/Button';
import useForm from '../hooks/useForm';
import validate from '../utils/LoginFormValidationRules';

import './Login.css';

function Login() {
  const { values, errors, handleChange, handleSubmit } = useForm(
    login,
    validate
  );

  function login() {
    console.log(values);
  }

  return (
    <section className='login'>
      <div className='box'>
        <h3 className='login-title'>Log in to Trello</h3>
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
        </form>
      </div>
    </section>
  );
}

export default Login;
