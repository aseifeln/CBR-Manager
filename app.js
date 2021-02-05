require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const workers = require('./routes/workers');

const app = express();
const PORT = 5000;

app.get("/", (req, res) => {
    res.send("Hello");
});

// Bodyparser Middleware
app.use(bodyParser.json());

// Routes
app.use('/workers', workers)

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

module.exports = {app};