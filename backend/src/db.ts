const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/Monografia', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
})
	.then(() => {
		console.log('Connected to the Monografia database');
	})
	.catch((error) => {
		console.error('Error connecting to the MonografiaII database:', error);
	});