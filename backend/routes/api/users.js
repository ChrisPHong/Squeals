const express = require('express');
const asyncHandler = require('express-async-handler');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Review, Business } = require('../../db/models');
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
        const { email, password, username, image } = req.body;


        const user = await User.signup({ email, username, password, image });

        await setTokenCookie(res, user);

        return res.json({
            user,
        });
    }),
);
// Profile Page
router.get(
    '/:userId', asyncHandler(async (req, res) => {
        let userId = parseInt(req.params.userId, 10)

        const user = await User.findByPk(userId, {
            include: {
                model: Review,
                include: Business
            },
            where: { userId: userId },
            order: [['createdAt', 'ASC']]

        })

        console.log('<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< USER', user.Reviews[0].Business);
       



        return res.json(user);
    }),
);

module.exports = router;
