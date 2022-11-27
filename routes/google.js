const express = require('express')
const passport = require('../configs/passportGoogle')
const router = express.Router()

router.get('/', passport.authenticate('google', {
    scope:
        ['email', 'profile']
}
))
router.get('/callback', passport.authenticate('google', {
    failureRedirect: '/failed',
    session: false,
}),
    function (req, res) {
        return res.status(200).json({
            data: req.user
        })

    })



module.exports = router