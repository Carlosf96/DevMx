const express = require('express');//pull in express


const app = express();//init express

app.get('/', (req, res) => res.send('hello'));//basic route

const port = 5000 || process.env.PORT;//port local or on heroku

app.listen(port, () => console.log(`Server running on port ${port}`));//server