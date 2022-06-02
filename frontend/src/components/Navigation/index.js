import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
        <ProfileButton user={sessionUser} />
        <NavLink to="/businesses">Upload Your Business</NavLink>
        <a href='https://github.com/ChrisPHong/Squeals'>GitHub</a>
        <a href='https://www.linkedin.com/in/christopherpyohong/'>LinkedIn</a>
      </>
    );
  } else {
    sessionLinks = (
      <>
        <NavLink to="/login">Log In</NavLink>
        <NavLink to="/signup">Sign Up</NavLink>
        <a href='https://github.com/ChrisPHong/Squeals'>GitHub</a>
        <a href='https://www.linkedin.com/in/christopherpyohong/'>LinkedIn</a>
      </>
    );
  }

  return (
    <ul>
      <li>
        <NavLink exact to="/">Home</NavLink>
        {isLoaded && sessionLinks}
      </li>
    </ul>
  );
}

export default Navigation;
