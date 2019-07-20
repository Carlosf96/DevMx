const express = require('express');//pull in express
const mongoose = require('mongoose');


const app = express();//init express
//db config
const db = require('./config/keys').mongoURI;

//Connect to mongoDB

mongoose.connect(db, {
  useNewUrlParser: true
})
  .then(() => console.log('mongoDB connected successfully'))
  .catch((err) => console.log(err));

app.get('/', (req, res) => res.send('hello'));//basic route

const port = 5000 || process.env.PORT;//port local or on heroku

app.listen(port, () => console.log(`Server running on port ${port}`));//server