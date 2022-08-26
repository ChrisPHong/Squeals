import React, { useState, useEffect } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './BusinessFormPage.css';
import { createBusiness } from '../../store/business';
import { useHistory } from 'react-router-dom';


function BusinessPageForm() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [image, setImage] = useState(null);
    const [errors, setErrors] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [show, setShow] = useState(false);

    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
    }, [dispatch]);

    let userId = useSelector((state) => state.session.user.id)

    const updateFile = (e) => {
        const file = e.target.files[0];
        console.log(file)
        if (file) setImage(file);
    };

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
        if (image == null) error.push('Provide a picture')

        setErrors(error);
    }, [title, description, address, state, city, zipCode, phoneNumber, image])

    const onSubmit = async (e) => {
        e.preventDefault();
        if (errors.length > 0) {
            setShow(true)
            return;
        }
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
            await dispatch(createBusiness(payload))

            await history.push('/businesses');
        }

    }


    return (
        <form className="businessForm" onSubmit={onSubmit}>
            <h2 className='business-title'>Create Your Business</h2>
            {show && errors.length > 0 ?
                <>
                    <ul className='errorsArray'>{errors.map(error => {
                        return (
                            <div key={error}>
                                <li className='errorItem'
                                    key={error}>{error}</li>
                            </div>

                        )
                    })}
                    </ul>
                </>
                : null}
            <div className='titleInput'>

                <label className='custom-field'>

                    <input type='text'
                        required

                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <span className='placeholder'>Business Title</span>
                </label>
            </div>
            <div className='formDiv'>
                <label className='custom-field'>
                    <input type='text'
                        required
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <span className='placeholder'>Description</span>
                </label>
            </div>
            <div className='formDiv'>

                <label className='custom-field'>

                    <input type='text'
                        required
                        className='inputBox'
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                    <span className='placeholder'>Address</span>
                </label>
            </div>
            <div className='formDiv'>

                <label className='custom-field'>

                    <input type='text'
                        required
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                    <span className='placeholder'>City</span>
                </label>
            </div>
            <div className='formDiv'>
                <label className='custom-field'>
                    <input type='text'
                        required
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                    />
                    <span className='placeholder'>State</span>
                </label>
            </div>
            <div className='formDiv'>

                <label className='custom-field'>
                    <input type='text'
                        required
                        value={zipCode}
                        onChange={(e) => setZipCode(e.target.value)}
                    />
                    <span className='placeholder'>Zip Code</span>

                </label>
            </div>
            <div className='formDiv'>

                <label className='custom-field'>
                    <input type='text'
                        required
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                    <span className='placeholder'>Phone Number</span>

                </label>
            </div>
            <div className='formDiv'>


                <label className='custom-field'>
                    <input type='file'
                    className='input-upload'
                        required
                        hidden
                        onChange={updateFile}
                    />
                    <span className='placeholder-upload'>Upload Picture</span>
                </label>
            </div>
            <button
                className='submitButtonBusiness'
                type='submit'
            >Submit</button>
        </form>
    )
}

export default BusinessPageForm;
