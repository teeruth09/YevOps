const mongoose = require('mongoose')

const { MONGO_URI } = process.env

exports.connect = () => {

    mongoose.connect(MONGO_URI)
    .then(() => {
        console.log("Successfully connected to database");
    })
    .catch((error) => {
        console.log("Error connecting to database");
        console.error(error);
        process.exit(1)
    });
}