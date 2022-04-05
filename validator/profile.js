const validate = require('../middleware/validator')
const { body, param } = require('express-validator')
const { User } = require('../model')

exports.follow = validate([
    param('username')
        .custom(async (username, { req }) => {
            const user = await User.findOne({ username })
            if (user) {
                req.follow = user
            } else {
                return (Promise.reject('用户名不存在'))
            }
        }),
])

exports.unfollow = validate([
    param('username')
        .custom(async (username, { req }) => {
            const user = await User.findOne({ username })
            if (user) {
                req.unfollow = user
            } else {
                return (Promise.reject('用户名不存在'))
            }
        }),
])