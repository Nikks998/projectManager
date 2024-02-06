const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        mongoose.set('strictQuery', false);
        const connection = await mongoose.connect(process.env.DB_CONNECTION, {
        });

        const url =
            `${connection.connection.host}:${connection.connection.port}`;
        console.log(`MongoDB connected in ${url}`)

    } catch (error) {
        console.log(`error: ${error.message}`);
        process.exit(1); //obliga a terminar todos los procesos 
    }
}

module.exports = connectDB