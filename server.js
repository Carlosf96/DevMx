const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

const app = express();//init express

//Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//DB configuration 
const db = require('./config/keys').mongoURI;

//Connect to mongoDB

mongoose.connect(db, {
  useNewUrlParser: true
})
  .then(() => console.log('mongoDB connected successfully'))
  .catch((err) => console.log(err));

//passport middleware
app.use(passport.initialize());

require('./config/passport.js')(passport);
//passport config

//expose our routes to our express server
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);


const port = 5000 || process.env.PORT;//port local or on heroku

app.listen(port, () => console.log(`Server running on port ${port}`));//server