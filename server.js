const express = require('express');
const PORT = 8000;
const app = express();
const cors = require('cors');
const models = require('./server/models');

require('dotenv').config()

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
    console.log('listening on port' + PORT)
});




app.use('/users', require('./server/routes/users.routes'));