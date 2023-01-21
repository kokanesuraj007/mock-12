const mongoose = require("mongoose")
require("dotenv").config()

const connection = async () => {
    mongoose.set('strictQuery', true)
    
    mongoose.connect(process.env.URL)
        .then(() => console.log("mongoDB connected successfully"))
        .catch((e) => console.log(e))
}
module.exports = connection;