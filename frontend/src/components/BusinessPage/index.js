import React, { useState, useEffect } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './business.css';


function BusinessPage() {
    const dispatch = useDispatch();

    return (
        <div>
            <h1>Businesses</h1>
            <div>
             <ul>
                
             </ul>
            </div>
        </div>
    )
  }

  export default BusinessPage;
