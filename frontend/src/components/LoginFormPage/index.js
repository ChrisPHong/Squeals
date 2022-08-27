// frontend/src/components/LoginFormPage/index.js
import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Redirect, useHistory, Link } from 'react-router-dom';
import './LoginForm.css';
import { login } from '../../store/session'

function LoginFormPage() {
  const history = useHistory();
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);
  const user = { credential: 'demo@user.io', password: 'password' }


  if (sessionUser) return (
    <Redirect to="/businesses" />
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  }

  return (
    <div className='OuterDiv'>

      <h2 className='titleforLoginPage'>Log In to Squeals</h2>
      <h4 className="titleDescriptionLoginPage">{'New to Squeals? '}
        <Link to='/signup' className="linkforSignUpPage">Sign Up</Link>
      </h4>

      <div className='loginFormDiv'>
        <form
          className='loginformDiv'
          onSubmit={handleSubmit}>
          <ul>
            {errors.map((error, idx) => <li key={idx}>{error}</li>)}
          </ul>

          <label className='custom-field'>
            <input
              type="text"
              value={credential}
              onChange={(e) => setCredential(e.target.value)}
              required
            />
            <span className='placeholderSignUp'>Username/Email</span>
          </label>

          <label className='custom-field'>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span className='placeholderSignUp'>Password</span>

          </label>

          <button className='loginButtonForm'
            type="submit">Login</button>
        </form>
        <div clasName='picture'>
          <img src='images/signup_illustration.png' />
        </div>
      </div>
      <button
        className='demoButtonLoginPage'
        onClick={async () => {
          await dispatch(login(user))
          await history.push('/businesses')
        }}>Demo User</button>
    </div>
  );
}

export default LoginFormPage;
