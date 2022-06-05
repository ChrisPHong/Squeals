import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import './SplashPage.css';
import { login } from '../../store/session'

function SplashPage() {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = { credential: 'demo@user.io', password: 'password' }

    return (
        <div className='fullDiv'>
            <div className='splashCard'>
                <h1 className='welcome'>Welcome to Squeals</h1>
                {/* <p className='splashPageParagraph'>Squeals is the app to look for a specific business and you can sign up and create your own business too! Don't be afraid to sign up and start your business journey!
            </p> */}
                <p className='splashPageParagraph'>Looking for a business? Squeals is the right application for you! Want to create your own business? Squeals is the right application for you! If you'd like a quick tour or what our app is all about, then please don't hesitate to click on the Demo User button! We hope you enjoy Squeals!</p>
            <button
                className='demoButtonSplashPage'
                onClick={async () => {
                    await dispatch(login(user))
                    await history.push('/businesses')
                }}>Demo User</button>
            </div>
        </div>
    )
}


export default SplashPage;
