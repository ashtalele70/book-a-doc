const express = require('express');
const cors = require('cors');
const frontEndURL = require('./hostname');
const app = express();

app.use(cors({ origin: frontEndURL.frontendurl, credentials: true }));
app.use(express.static('uploads'));
// Connect Database
// connectDB.connectDB();

// Allow Access Control
app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', frontEndURL.frontendurl);
	res.setHeader('Access-Control-Allow-Credentials', 'true');
	res.setHeader(
		'Access-Control-Allow-Methods',
		'GET,HEAD,OPTIONS,POST,PUT,DELETE',
	);
	res.setHeader(
		'Access-Control-Allow-Headers',
		'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers',
	);
	res.setHeader('Cache-Control', 'no-cache');
	next();
});


// Init Middleware
app.use(express.json({ extended: false }));

// Define Routes
app.get('/', (req, res) => console.log('Api running'));
app.use('/', require('./routes/registerPatient'));
app.use('/', require('./routes/appointments'));
app.use('/', require('./routes/admin'));
app.use('/', require('./routes/registerDoctor'));
app.use('/', require('./routes/feedback'));


const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
