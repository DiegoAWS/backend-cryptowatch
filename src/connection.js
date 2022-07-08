const mongoose = require('mongoose');

const connectDB = () => {
    const uri = process.env.MONGO_DB_URI || "mongodb://localhost:27017/cryptowat"

    async function main() {
        await mongoose.connect(uri);
    }

    main().catch(err => console.log({ err }));

}

module.exports = { connectDB };