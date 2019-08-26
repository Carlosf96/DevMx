const express = require('express');
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');
const router = express.Router();

// Load User model
const User = require('../../models/User');

// @route  GET api/users/test
// @desc   Tests users route
// @access Public
router.get('/test', (req, res) => res.json({ msg: 'User works' }));

// @route  POST api/users/register
// @desc   Register user
// @access Public
router.post('/register', (req, res) => {
  const { name, email, password } = req.body;

  User.findOne({ email: email }).then(user => {
    if (user) {
      return res.status(400).json({
        email: 'Email Already Exists'
      });
    } else {
      const avatar = gravatar.url(email, {
        s: '200', // Size
        r: 'pg', // Rating
        d: 'mm' // Default
      });

      const newUser = new User({
        name: name,
        email: email,
        avatar,
        password: password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route  POST api/users/login
// @desc   Login user and return JWT Token
// @access Public

router.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Find User by Email
  User.findOne({ email }).then(user => {
    // Check for user
    if (!user) {
      return res.status(404).json({
        email: 'User email not found'
      });
    }
    // Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User matched
        const payload = {
          id: user.id,
          name: user.name,
          avatar: user.avatar
        }; // JWT payload

        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: 'Bearer ' + token
            });
            if (err) throw err;
          }
        );
      } else {
        res.status(400).json({
          password: 'Password Incorrect'
        });
      }
    });
  });
});

// @route  GET api/users/current
// @desc   Return Current User
// @access Private

router.get(
  '/current',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { user } = req;

    res.json({
      id: user.id,
      name: user.name,
      email: user.email
    });
  }
);

module.exports = router;