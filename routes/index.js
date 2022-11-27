const express = require('express')
const google = require('./google')
const student = require('./student')

const router = express.Router()

router.use('/google', google )
router.use('/student', student)



module.exports = router