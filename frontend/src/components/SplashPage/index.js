import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import './SplashPage.css';


function SplashPage (){

    return (
        <div className='fullDiv'>
            <div className='title'>
            <h1 className='welcome'>Welcome to Squeals</h1>
            <div>.</div>
            <div>.</div>
            <div>.</div>
            <div>.</div>
            <div>.</div>
            <div>.</div>
            <div>.</div>
            <div>.</div>
            <div>.</div>
            <div>.</div>
            <div>.</div>

            </div>
        </div>
    )
}


export default SplashPage;
