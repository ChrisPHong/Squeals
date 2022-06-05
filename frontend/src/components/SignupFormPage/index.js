import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import * as sessionActions from "../../store/session";
import './SignupForm.css'
import { login } from '../../store/session'

function SignupFormPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = { credential: 'demo@user.io', password: 'password' }
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({ email, username, password }))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  return (
    <div className="centerpageDivSignUp">
            <h2 className="titleforSignUpPage">Sign Up for Squeals
            </h2>
            <h4 className="titleDescriptionSignUpPage">Connect with Great Businesses</h4>
    <div className="pageDiv">
      <div className="signUpFormDiv">
        <form onSubmit={handleSubmit}>
          <div className="withinFormDiv">

            <ul>
              {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>
            <h2>{errors.length > 0 ? 'Fix Your Errors to Create an Account' : 'Create an Account'}</h2>
            <input
              placeholder="Email..."
              className="inputValuesSignUp"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="text"
              className="inputValuesSignUp"
              placeholder="Username..."
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />

            <input
              type="password"
              className="inputValuesSignUp"
              placeholder="Password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />


            <input
              type="password"
              className="inputValuesSignUp"
              placeholder="Confirmed Password..."
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />

            <button
              className="submitSignUpButton"
              type="submit">Sign Up</button>
          </div>
        </form>
      </div>
      <div className='imageSignUpDiv'>
      <img src='images/signup_illustration.png' />
      </div>

    </div>
      <button
                className='demoButtonSignupPage'
                onClick={async () => {
                    await dispatch(login(user))
                    await history.push('/businesses')
                }}>Demo User</button>
    </div>
  );
}

export default SignupFormPage;
