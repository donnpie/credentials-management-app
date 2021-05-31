const express = require('express');
const mongoose = require('mongoose');
const db = require('./config/secrets').mongoUri;


const app = express();

//Connect to remote mongo
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true  })
.then(() => console.log('MongoDb remote connected...'))
.catch(err => console.log(err));

//Middleware

//Listen
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is now listening on port ${port}`));