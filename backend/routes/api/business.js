const express = require('express');
const asyncHandler = require('express-async-handler');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Business } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateSignup = [
    check('title')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a valid title.'),
    check('description')
        .exists({ checkFalsy: true })
        .isLength({ min: 10 })
        .withMessage('Please provide a description with at least 10 characters.'),
    check('address')
        .isLength({ min: 5 })
        .withMessage('Address must be more than 5 characters'),
    check('city')
        .exists({ checkFalsy: true })
        .withMessage('Please Provide a valid City'),
    check('state')
        .exists({ checkFalsy: true })
        .withMessage('Please Provide a valid state'),
    check('zipCode')
        .exists({ checkFalsy: true })
        .isLength({ min: 5 })
        .withMessage('A zip code must be at least 5 characters.'),
    check('phoneNumber')
        .exists({ checkFalsy: true })
        .isLength({ min: 10 })
        .withMessage('A Phone number requires 10 minimum digits'),
    check('image')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a picture of your business'),
    handleValidationErrors
];

// Sign up
router.get('/', asyncHandler(async (req, res) => {
    const business = await Business.findAll({ order: [['name', 'ASC']] })

    return res.json({ business })
})

)

router.post(
    '/',
    validateSignup, requireAuth,
    asyncHandler(async (req, res) => {
        const { title, description, address, city, state, zipCode, phoneNumber, image } = req.body;
        const business = await Business.signup({ title, description, address, city, state, zipCode, phoneNumber, image });

        await setTokenCookie(res, business);

        return res.json({
            business,
        });
    }),
);

module.exports = router;
