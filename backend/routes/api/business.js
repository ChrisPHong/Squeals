const express = require('express');
const asyncHandler = require('express-async-handler');
const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { Business, User, Review } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const {singlePublicFileUpload, singleMulterUpload} = require('../../awsS3')

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
    // check('image')
    //     .exists({ checkFalsy: true })
    //     .withMessage('Please provide a picture of your business'),
    handleValidationErrors
];

// Get all the businesses
router.get('/', asyncHandler(async (req, res) => {

    const business = await Business.findAll({ order: [['id', 'ASC']] })

    return res.json({ business })
})

)

router.post(
    '/',
    requireAuth, singleMulterUpload("image"),
    validateSignup,
    asyncHandler(async (req, res) => {
        const { userId, title, description, address, city, state, zipCode, phoneNumber} = req.body;
        const profileImageUrl = await singlePublicFileUpload(req.file);

        const business = await Business.create({ userId, title, description, address, city, state, zipCode, phoneNumber, image: profileImageUrl });

        return res.json(business);
    }),
);

router.get('/:businessId', asyncHandler(async (req, res) => {
    const businessId = parseInt(req.params.businessId, 10)
    const business = await Business.findByPk(businessId)
    // const reviews = await Review.findAll({
    //     where:{businessId: businessId},
    //     order: [['rating', 'ASC']]}
    //     )

    // return res.json({reviews, business});
    return res.json({business});
})

)

router.put(
    '/:businessId',
    requireAuth,
    asyncHandler(async (req, res) => {
        const business = await Business.findByPk(parseInt(req.params.businessId, 10));
        business.title = req.body.title;
        business.description = req.body.description;
        business.address = req.body.address;
        business.city = req.body.city;
        business.state = req.body.state;
        business.zipCode = req.body.zipCode;
        business.phoneNumber = req.body.phoneNumber;
        business.image = req.body.image;

        await business.save();

        return res.json(business);

    })
)

router.delete('/:businessId', asyncHandler(async (req, res) => {

    const business = await Business.findByPk(parseInt(req.params.businessId, 10))
    await business.destroy();
    console.log(business, "is this the business<<<<<<<<<<<<<<<<<<<<<<<")
    return res.json({business});
    // return res.json("succesfully deleted post");

})

)

router.get('/:businessId/reviews', asyncHandler(async (req, res) => {
    const businessId = parseInt(req.params.businessId, 10)
    const business = await Business.findByPk(businessId)
    const reviews = await Review.findAll({where: {businessId: businessId}})
    console.log(business, "Which business are we talking about? <<<<<<<<<<<<<<<<<<<<<")
    console.log(reviews, "What are the reviews <<<<<<<<<<<<<<<<<<<<<")
    // const reviews = await Review.findAll({
    //     where:{businessId: businessId},
    //     order: [['rating', 'ASC']]}
    //     )

    // return res.json({reviews, business});
    return res.json(reviews);
})

)

module.exports = router;
