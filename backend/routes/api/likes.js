const express = require('express');
const asyncHandler = require('express-async-handler');
const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { Business, User, Review, Like } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');


const router = express.Router();


router.put(
    '/:reactionId',
    requireAuth,
    asyncHandler(async (req, res) => {
        console.log('hitting this route')
        const reactionId = parseInt(req.params.reactionId, 10)
        const reaction = await Like.findByPk(reactionId);
        if (reaction) {
            await reaction.destroy()
            return res.json(reaction)
        } else {
            const { userId, reviewId, label } = req.body
            const reaction = await Like.create({ userId, reviewId, label });
            return res.json(reaction)
        }


    })
)

module.exports = router;
