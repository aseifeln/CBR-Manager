const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Bodyparser Middleware
app.use(bodyParser.json());




const PORT = 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

module.exports = {app};