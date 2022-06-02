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
      <div className='navbarDiv'>
        <NavLink exact to="/">Home</NavLink>
        <ProfileButton user={sessionUser} />
        <NavLink to="/businesses">Upload Your Business</NavLink>
        <a href='https://github.com/ChrisPHong/Squeals'>GitHub</a>
        <a href='https://www.linkedin.com/in/christopherpyohong/'>LinkedIn</a>

      </div>
    );
  } else {
    sessionLinks = (
      <>
      <div className='navbarDiv'>
        <NavLink to="/login">Log In</NavLink>
      </div>
      <div>
        <NavLink to="/signup">Sign Up</NavLink>
      </div>
        <a href='https://github.com/ChrisPHong/Squeals'>GitHub</a>
        <a href='https://www.linkedin.com/in/christopherpyohong/'>LinkedIn</a>
      </>
    );
  }

  return (
    <>
      <div>

        {isLoaded && sessionLinks}
      </div>
    </>
  );
}

export default Navigation;
