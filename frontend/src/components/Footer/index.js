import './Footer.css'
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {useHistory} from 'react-router-dom'

function Footer(){
    return (
        <div className='footerDiv'>
                <a className='footerLink' href='https://reactjs.org/docs/getting-started.html'> React </a>
                <a className='footerLink' href='https://redux.js.org/usage/'> Redux </a>
                <a className='footerLink' href='https://developer.mozilla.org/en-US/docs/Web/JavaScript'> JS </a>
                <a className='footerLink' href='https://developer.mozilla.org/en-US/docs/Web/CSS'> CSS </a>
        </div>
    )
}



export default Footer;
