import React, { useState, useEffect } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './BusinessEditPage.css';
import { createBusiness, editBusiness } from '../../store/business';
import { useHistory, useParams } from 'react-router-dom';
import { getOneBusiness, deleteBusiness } from '../../store/business' //We might just need only one

function BusinessPageEditForm() {
    const businessId = useParams();
    const actualId = Object.values(businessId)[0]
    const business = useSelector(state => state.business[actualId])
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
        dispatch(getOneBusiness(Object.values(businessId)[0]))

    }, [dispatch, businessId]);



    const [title, setTitle] = useState(business.title);
    const [description, setDescription] = useState(business.description);
    const [address, setAddress] = useState(business.address);
    const [city, setCity] = useState(business.city);
    const [state, setState] = useState(business.state);
    const [zipCode, setZipCode] = useState(business.zipCode);
    const [phoneNumber, setPhoneNumber] = useState(business.phoneNumber);
    const [image, setImage] = useState(business.image);
    const [errors, setErrors] = useState([]);

    const history = useHistory();

    let userId = useSelector((state) => state.session.user.id)

    useEffect(() => {
        const error = [];
        if (title.length < 1) error.push('You must put a title with at least 1 character')
        if (description.length < 10) error.push('You must put at least 10 characters description')
        if (address.length < 5) error.push('You must put at 5 characters for a valid address')
        if (state.length < 1) error.push('You must put a state with at least 1 character')
        if (city.length < 1) error.push('You must put a city with at least 1 character')
        if (zipCode.length < 5 || zipCode.length > 5) error.push('You must put a valid zipcode of 5 numbers max total')
        if (phoneNumber.length < 10) error.push('You must put 10 numbers for a valid phone number')
        if (!image.includes('https://') || !image.includes('.com')) error.push('You must put a valid image URL. i.e. "https://website.com/photoId"')


        setErrors(error);
    }, [title, description, address, state, city, zipCode, phoneNumber, image])

    const onSubmit = async (e) => {
        e.preventDefault();
        if (errors.length === 0) {
            const payload = {
                userId,
                title,
                description,
                address,
                city,
                state,
                zipCode,
                phoneNumber,
                image
            }
            dispatch(editBusiness(actualId, payload))
            history.push('/businesses');
        }

    }
    return (
        <>
            {userId === business.userId ?
            <form className='businessForm'
            onSubmit={onSubmit}>
                <h2>Editing Business Form</h2>
                <ul className='errors array'>
                    {(errors.length > 0) ? errors.map(error => {
                        return <li key={error}>{error}</li>
                    }) : null}
                </ul>
                <label>Title</label>
                <input type='text'
                    className='inputBox'
                    required
                    placeholder='Business Title'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    />

                <label>Description</label>
                <input type='text'
                    required
                    className='inputBox'
                    placeholder='Description'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <label>Address</label>
                <input type='text'
                    required
                    className='inputBox'
                    placeholder='12345 Squeals St.'
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    />

                <label>City</label>
                <input type='text'
                    required
                    className='inputBox'
                    placeholder='City'
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    />

                <label>State</label>
                <input type='text'
                    required
                    className='inputBox'
                    placeholder='State'
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    />

                <label>Zip</label>
                <input type='text'
                    required
                    className='inputBox'
                    placeholder='Zip code'
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                    />

                <label>Phone Number</label>
                <input type='text'
                    required
                    className='inputBox'
                    placeholder='Phone Number'
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    />

                <label>Image</label>
                <input type='text'
                    required
                    className='inputBox'
                    placeholder='Image url'
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    />
                <button
                    type='submit'
                    className='submitButton'
                    disabled={errors.length > 0 ? true : false}
                    >{errors.length > 0 ? 'Fix Your Errors' : 'Submit'}</button>
            </form>
                    : null}
        </>
    )
}

export default BusinessPageEditForm;
