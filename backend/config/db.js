const mongoose = require('mongoose');

const connect = () => {
  mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => {
    console.log('MongoDB connected');
  }).catch(err => {
    console.error('Error connecting to MongoDB:', err);
  });
};

module.exports = { connect };
