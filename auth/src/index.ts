import mongoose from 'mongoose';
import app from './app';

const start = async () => {
    if (!process.env.JWT_KEY) {
        throw new Error('JWT_KEY is required');
    }

    if (!process.env.MONGOURL) {
        throw new Error('MongoURL is required');
    }

    // const MONGOURL = 'mongodb://auth-mongo-srv:27017/auth';
    try {
        await mongoose.connect(process.env.MONGOURL);
        console.log('Connected to auth database');
    } catch (err) {
        console.log(err);
    }

    app.listen(80, () => {
        console.log("Listening on port 80");
    });
}

start();