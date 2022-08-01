import './Footer.css'
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {useHistory} from 'react-router-dom'

function Footer(){
    return (
        <div className='footerDiv'>
                <p className='footerLink' href='https://reactjs.org/docs/getting-started.html'> React </p>
                <p className='footerLink' href='https://redux.js.org/usage/'> Redux </p>
                <p className='footerLink' href='https://developer.mozilla.org/en-US/docs/Web/JavaScript'> JS </p>
                <p className='footerLink' href='https://developer.mozilla.org/en-US/docs/Web/CSS'> CSS </p>
        </div>
    )
}



export default Footer;
