import React, { useState, useEffect } from 'react';
import './ProfilePageEdit.css';
import { useSelector, useDispatch } from 'react-redux'
import * as sessionActions from '../../store/session'
import { editUserProfile, loadUserInfo } from '../../store/user'
import { useHistory } from 'react-router-dom'
import { useParams } from 'react-router-dom'



function ProfilePageEdit() {
    const dispatch = useDispatch();
    const history = useHistory();
    const userId = useSelector((state) => state.session.user.id);
    const profileId = useParams()?.userId

    const [isLoaded, setIsLoaded] = useState(false);
    const [image, setImage] = useState(null)
    const [bio, setBio] = useState('')
    const [errors, setErrors] = useState('')
    const [show, setShow] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (errors.length > 0) {
            setShow(true)
            return;
        }
        if (errors.length === 0) {
            const payload = {
                bio,
                image,
                id: userId
            }

           await dispatch(editUserProfile(payload))
           await dispatch(loadUserInfo(profileId))
           await history.push(`/users/${profileId}`)
        }
    }

    useEffect(() => {
        const error = [];
        if(bio.length > 200) error.push('Bio has a max 200 character limit')
        setErrors(error);
    }, [])

    const updateFile = (e) => {
        const file = e.target.files[0];
        if (file) setImage(file);
    };


    return (
        <div>
            <div className='review-container-entire'>
                <div className='title-business-review'>

                    <h2 className='businessTitle-Review'></h2>
                    <form
                        className='review-form'
                        onSubmit={handleSubmit}>
                        {errors.length > 0 ? <h3 className='validationErrorsReviews'>Add Changes</h3> : <h3>Submit Changes</h3>}
                        <ul className='errors-array'>{show && errors.length > 0 ? errors.map(error => {
                            return <span className='errorLi'
                                key={error}>{error}</span>
                        }) : null}
                        </ul>

                        <label className='custom-fieldReview'>
                            <input
                                required
                                value={bio}
                                onChange={(e) => {
                                    setBio(e.target.value);
                                }}
                            />
                            <span className='placeholder'>Bio</span>
                        </label>

                        <label className='custom-fieldReview'>
                            <input type='file'
                                hidden
                                required
                                onChange={updateFile}
                            />
                            <span className='placeholder-upload'>Upload Picture</span>
                        </label>

                        <button
                            className='submitButton'
                            type='submit'
                        >Post Profile</button>
                    </form>
                </div>
            </div>
        </div>
    )
}


export default ProfilePageEdit;