// backend/routes/api/users.js
const express = require('express');

const {
    setTokenCookie,
    requireAuth
} = require('../../utils/auth');
const {
    User
} = require('../../db/models');



const {
    check
} = require('express-validator');
const {
    handleValidationErrors
} = require('../../utils/validation');

const router = express.Router();


const validateSignup = [
    check('email')
    .exists({
        checkFalsy: true
    })
    .isEmail()
    .withMessage('Please provide a valid email.'),
    check('username')
    .exists({
        checkFalsy: true
    })
    .isLength({
        min: 4
    })
    .withMessage('Please provide a username with at least 4 characters.'),
    check('firstName')
    .exists({
        checkFalsy: true
    })
    .isLength({
        min: 1
    })
    .withMessage('Please provide a first name with at least 1 character.'),
    check('lastName')
    .exists({
        checkFalsy: true
    })
    .isLength({
        min: 1
    })
    .withMessage('Please provide a last name with at least 1 character.'),
    check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
    check('password')
    .exists({
        checkFalsy: true
    })
    .isLength({
        min: 6
    })
    .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors
];

// Sign up
router.post(
    '/',
    validateSignup,
    async (req, res) => {
        const {
            email,
            firstName,
            lastName,
            password,
            username
        } = req.body;

        // body validation:
        if (!email || !username || !firstName || !lastName) {
            res.status(400)
            return res.json({
                "message": "Validation error",
                "statusCode": 400,
                "errors": {
                    "email": "Invalid email",
                    "username": "Username is required",
                    "firstName": "First Name is required",
                    "lastName": "Last Name is required"
                }

            })
        }

        //checking for unique username

        let existingUser = await User.findOne({
            where: {
                username
            }
        })

        if (existingUser) {
            res.status(403)
            return res.json({
                "message": "User already exists",
                "statusCode": 403,
                "errors": {
                    "username": "User with that username already exists"
                }
            })
        }

        // checking for unique email
        let existingEmail = await User.findOne({
            where: {
                email
            }
        })

        if (existingEmail) {
            res.status(403)
            return res.json({
                "message": "User already exists",
                "statusCode": 403,
                "errors": {
                    "email": "User with that email already exists"
                }
            })
        }



        // if all is good, then we can sign up the new user


        const user = await User.signup({
            email,
            firstName,
            lastName,
            username,
            password
        });

       let cookie =  await setTokenCookie(res, user);

       console.log(cookie)
        return res.json({
            id: user.id,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            token: cookie
        });
    }
);


module.exports = router;
