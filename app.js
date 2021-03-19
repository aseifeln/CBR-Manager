const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config({path: '.env'});

//Requiring the routes created
const users = require('./routes/users');
const clients = require('./routes/clients');
const excel = require('./routes/excel');
const visits = require('./routes/visits');
const referrals = require('./routes/referrals');
const workers = require('./routes/workers');

const app = express();
const path = require('path')


// Bodyparser Middleware
app.use(bodyParser.json());

// Routes
app.use('/users', users);
app.use('/clients', clients);
app.use('/excel', excel);
app.use('/visits', visits);
app.use('/referrals', referrals);
app.use('/workers', workers);

// Running in production

// Reference: https://www.youtube.com/watch?v=71wSzpLyW9k
if (process.env.NODE_ENV === 'production')
{
	console.log("Running in production...")
	app.use(express.static('client/build'));

	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	})
}

// Database
const db = require('./config/database')
db.authenticate()
	.then(() => console.log('[DB] connection established successfully'))
	.catch((err) => console.log('[DB] Warning: ' + err))

// Heroku will use some other port
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

module.exports = { app, server };


