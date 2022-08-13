const express = require('express');
const asyncHandler = require('express-async-handler');
const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { Business, User, Review } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const {singlePublicFileUpload, singleMulterUpload} = require('../../awsS3')


const router = express.Router();


const validateSignup = [
    check('rating')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a valid rating.'),
    check('answer')
        .exists({ checkFalsy: true })
        .isLength({ min: 10 })
        .withMessage('Please provide an answer with at least 10 characters.'),

    handleValidationErrors
];

router.get('/', asyncHandler(async (req, res) => {

    const businessId = parseInt(req.params.id)
    const reviews = await Review.findAll({
        where: { businessId },
        order: [['rating', 'ASC']]
    })
    const usernames = await User.findAll({
        where: { reviewId },
        order: [['rating', 'ASC']]

    })
    console.log(usernames, "USER NAMES >>>>>>>>>>>>>>>>>>>>>")
    return res.json({ reviews });

}))

router.get('/:reviewId', asyncHandler(async (req, res) => {
    const reviewId = parseInt(req.params.reviewId, 10)
    const review = await Review.findByPk(reviewId)
    return res.json({ review });
}))

router.post(
    '/',
    singleMulterUpload("image"),
     requireAuth,
     validateSignup,
    asyncHandler(async (req, res) => {
        const { userId, businessId, rating, answer } = req.body;
        const profileImageUrl = await singlePublicFileUpload(req.file);

        const review = await Review.create({ userId, businessId, rating, answer, image:profileImageUrl});
        return res.json(review);
    }),
);



router.put(
    '/:reviewId',
    requireAuth,
    asyncHandler(async (req, res) => {

        const review = await Review.findByPk(parseInt(req.params.reviewId, 10));
        review.answer = req.body.answer;
        review.rating = req.body.rating;

        await review.save();

        return res.json(review);

    })
)

router.delete('/:reviewId', asyncHandler(async (req, res) => {

    const review = await Review.findByPk(parseInt(req.params.reviewId, 10))
    await review.destroy();
    return res.json("succesfully deleted post");

})

)


module.exports = router;
