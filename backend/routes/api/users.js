const express = require('express');
const asyncHandler = require('express-async-handler');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateSignup = [
    check('email')
        .exists({ checkFalsy: true })
        .isEmail()
        .withMessage('Please provide a valid email.'),
    check('username')
        .exists({ checkFalsy: true })
        .isLength({ min: 4 })
        .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
        .not()
        .isEmail()
        .withMessage('Username cannot be an email.'),
    check('password')
        .exists({ checkFalsy: true })
        .isLength({ min: 6 })
        .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors
];

// Sign up
router.post(
    '/',
    validateSignup,
    asyncHandler(async (req, res) => {
        const { email, password, username, image} = req.body;
        console.log(req.body, 'what is this image?')
        console.log("<<<<<<<<<<<<<<<<,,,,,, image ", image)
        
        const user = await User.signup({ email, username, password, image});
        // user.image = 'https://quickspic.s3.us-west-1.amazonaws.com/defaultPicture.png'
        console.log("<<<<<<<<<<<<<<<<,,,,,, What kind of User is it", user)
        await setTokenCookie(res, user);

        return res.json({
            user,
        });
    }),
);

module.exports = router;
