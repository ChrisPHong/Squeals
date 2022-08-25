import React, { useState, useEffect } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './BusinessEditPage.css';
import { editBusiness, loadBusinesses } from '../../store/business';
import { useHistory, useParams } from 'react-router-dom';
import { getOneBusiness } from '../../store/business'

function BusinessPageEditForm() {
    const dispatch = useDispatch();

    const businessId = Number(useParams()?.businessId);
    const business = useSelector(state => state?.business.one[businessId])
    const [isLoaded, setIsLoaded] = useState(false);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [errors, setErrors] = useState([]);

    const history = useHistory();
    let userId = useSelector((state) => state.session.user.id)

    useEffect(() => {
        dispatch(getOneBusiness(businessId))
        setTitle(business?.title);
        setDescription(business?.description);
        setAddress(business?.address);
        setCity(business?.city);
        setState(business?.state);
        setZipCode(business?.zipCode);
        setPhoneNumber(business?.phoneNumber);



    }, [dispatch, businessId]);

    useEffect(() => {
        window.scrollTo(0, 0)

    }, [])

    useEffect(() => {
        const error = [];
        if (title?.length < 1) error.push('You must put a title with at least 1 character')
        if (title?.length > 50) error.push('You must put a title with at max 50 characters')
        if (description?.length < 10) error.push('You must put at least 10 characters description')
        if (description?.length > 300) error.push('Description has a max 300 characters')
        if (address?.length < 5) error.push('You must put at 5 characters for a valid address')
        if (address?.length > 20) error.push('Address has a max 20 characters')
        if (state?.length < 1) error.push('You must put a state with at least 1 character')
        if (state?.length > 20) error.push('State has a max 20 characters')
        if (city?.length < 1) error.push('You must put a city with at least 1 character')
        if (city?.length > 36) error.push('City has a max 36 characters')
        if (zipCode?.length < 5 || zipCode?.length > 5) error.push('You must put a valid zipcode of 5 numbers max total')
        if (phoneNumber?.length !== 10) error.push('You must put 10 numbers for a valid phone number')

        setErrors(error);
    }, [title, description, address, state, city, zipCode, phoneNumber])

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

            }
            dispatch(editBusiness(businessId, payload))
            history.push('/businesses');
        }

    }
    return (
        <>
            {userId === business?.userId ?
                <form className='businessForm'
                    onSubmit={onSubmit}>
                    <h2 className='editing-business-title'>Editing Business Form</h2>
                    <ul className='errors array'>
                        {(errors.length > 0) ? errors.map(error => {
                            return <li key={error}>{error}</li>
                        }) : null}
                    </ul>

                    <label className='custom-fieldEdit'>
                        <input type='text'
                            required
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <span className='placeholderEdit'>Title</span>
                    </label>

                    <label className='custom-fieldEdit'>
                        <input type='text'
                            required
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <span className='placeholderEdit'>Description</span>
                    </label>

                    <label className='custom-fieldEdit'>
                        <input type='text'
                            required
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                        <span className='placeholderEdit'>Address</span>
                    </label>


                    <label className='custom-fieldEdit'>
                        <input type='text'
                            required
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        />
                        <span className='placeholderEdit'>City</span>
                    </label>

                    <label className='custom-fieldEdit'>
                        <input type='text'
                            required
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                        />
                        <span className='placeholderEdit'>State</span>
                    </label>


                    <label className='custom-fieldEdit'>
                        <input type='text'
                            required
                            value={zipCode}
                            onChange={(e) => setZipCode(e.target.value)}
                        />
                        <span className='placeholderEdit'>Zip Code</span>
                    </label>

                    <label className='custom-fieldEdit'>
                        <input type='text'
                            required
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                        <span className='placeholderEdit'>Phone Number</span>
                    </label>

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
