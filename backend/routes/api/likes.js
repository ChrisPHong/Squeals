const express = require('express');
const asyncHandler = require('express-async-handler');
const {requireAuth } = require('../../utils/auth');
const { Like } = require('../../db/models');



const router = express.Router();


router.put(
    '/:reactionId',
    requireAuth,
    asyncHandler(async (req, res) => {

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
