import React, { useState, useEffect } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './business.css';


function BusinessPage() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [image, setImage] = useState('');
    const [errors, setErrors] = useState([]);


    useEffect(() => {
        const error = [];
        if (title.length < 1) error.push('You must put a title')
        if (description.length < 1) error.push('You must put a description')
        if (address.length < 1) error.push('You must put an address')
        if (state.length < 1) error.push('You must put a state')
        if (city.length < 1) error.push('You must put a city')
        if (zipCode.length < 1) error.push('You must put a zipcode')
        if (phoneNumber.length < 1) error.push('You must put a phone number')
        if (image.length < 1) error.push('You must put an image URL')

        setErrors(error);
    }, [title, description, address, state, city, zipCode, phoneNumber, image])

    const onSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            title,
            description,
            address,
            city,
            state,
            zipCode,
            phoneNumber,
            image
        }

    }
    return (
        <form onSubmit={onSubmit}>
            <ul className='errors array'>{errors.length > 0 ? errors.map(error => {
                return <li key={error}>{error}</li>
            }) : null}</ul>
            <label>Title</label>
            <input type='text'
                required
                placeholder='Business Title'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            <label>Description</label>
            <input type='text'
                required
                placeholder='Description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />

            <label>Address</label>
            <input type='text'
                required
                placeholder='12345 Squeals St.'
                value={address}
                onChange={(e) => setAddress(e.target.value)}
            />

            <label>City</label>
            <input type='text'
                required
                placeholder='City'
                value={city}
                onChange={(e) => setCity(e.target.value)}
            />

            <label>State</label>
            <input type='text'
                required
                placeholder='State'
                value={state}
                onChange={(e) => setState(e.target.value)}
            />

            <label>Zip</label>
            <input type='text'
                required
                placeholder='Zip code'
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
            />

            <label>Phone Number</label>
            <input type='text'
                required
                placeholder='Phone Number'
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
            />

            <label>Image</label>
            <input type='text'
                required
                placeholder='https://images.unsplash.com/photo-1565958011703-44f9829ba187?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=765&q=80'
                value={image}
                onChange={(e) => setImage(e.target.value)}
            />
            <button
                type='submit'
                disabled={errors.length > 0 ? true : false}
            >Submit</button>
        </form>
    )
}

export default BusinessPage;
