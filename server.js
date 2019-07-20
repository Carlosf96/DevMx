const express = require('express');//pull in express
const mongoose = require('mongoose');

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

const app = express();//init express

//DB configuration 
const db = require('./config/keys').mongoURI;

//Connect to mongoDB

mongoose.connect(db, {
  useNewUrlParser: true
})
  .then(() => console.log('mongoDB connected successfully'))
  .catch((err) => console.log(err));

app.get('/', (req, res) => res.send('hello'));//basic route
//expose our routes to our express server
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);


const port = 5000 || process.env.PORT;//port local or on heroku

app.listen(port, () => console.log(`Server running on port ${port}`));//server