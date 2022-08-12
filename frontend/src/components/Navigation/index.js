import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import * as sessionActions from '../../store/session';
import { login } from '../../store/session'
import './Navigation.css';
import { useHistory } from 'react-router-dom'
import github from './github.png'
import linkedIn from './linkedIn.png'

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const user = { credential: 'demo@user.io', password: 'password' }
  const history = useHistory();
  let sessionLinks;

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    history.push('/');
  };

  if (sessionUser) {
    sessionLinks = (
      <div className='navbarDiv'>
        <Link to='/businesses'><img className='navBarIcon' src='images/squeals.png' /></Link>
        {/* <NavLink exact to="/businesses">Businesses</NavLink> */}
        {/* <ProfileButton user={sessionUser} /> */}
        <div className='right-side-Nav-Bar'>

          <button
            className='createYourBusinessButton'
            onClick={() => {
              history.push('/form')
            }}
            to="/form">Create Your Business</button>
          <a href='https://github.com/ChrisPHong/Squeals'><img className='icon-image' src={`${github}`} /></a>
          <a href='https://www.linkedin.com/in/christopherpyohong/'> <img className='icon-image' src={`${linkedIn}`} /></a>


          <button
            className="logOutButton"
            onClick={logout}>Log Out</button>

        </div>
      </div>
    );
  } else {
    sessionLinks = (
      <>
        <div className='navbarDiv'>
          <Link className='squealsLink' to='/'><img className='navBarIcon' src='images/squeals.png' /></Link>
          <NavLink className='LogInButton' to="/login">Log In</NavLink>
          <NavLink className='SignUpButton' to="/signup">Sign Up</NavLink>

          {/* <button
      className='demoButton'
      onClick={async () => {
        await dispatch(login(user))
        await history.push('/businesses')
      }}>Demo User</button> */}
          <a href='https://github.com/ChrisPHong/Squeals'>GitHub</a>
          <a href='https://www.linkedin.com/in/christopherpyohong/'>LinkedIn</a>
        </div>
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
