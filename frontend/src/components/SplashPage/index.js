import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import './SplashPage.css';


function SplashPage (){

    return (
        <div>
            <h1>Welcome to Squeals</h1>
        </div>
    )
}


export default SplashPage;
