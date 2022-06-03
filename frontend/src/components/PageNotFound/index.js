import React, { useState, useEffect } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './PageNotFound.css';
import { useHistory, useParams } from 'react-router-dom';


function PageNotFound(){
    return(
        <div>
            <h1> This Page Is not Found</h1>
        </div>
    )
}


export default PageNotFound;
