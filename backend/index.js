const express = require('express');
const app = express();
const env = require('dotenv').config();
const bodyparser = require('body-parser');
const cors = require('cors');

app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true 
}));


app.use(bodyparser.json());

require('./model/db');

// Routers
const Authlogin = require('./Routers/Authrouter');

app.use('/auth', Authlogin);


// Server Port
const port = process.env.port || 8000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
