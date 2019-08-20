var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/nextu', { useNewUrlParser: true });


module.exports = mongoose;