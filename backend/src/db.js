var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/Monografia', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(function () {
    console.log('Connected to the Monografia database');
})
    .catch(function (error) {
    console.error('Error connecting to the MonografiaII database:', error);
});
