import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import app from '../app';

let mongod : any;
beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const mongoURI = mongod.getUri();
    await mongoose.connect(mongoURI, {});
});

beforeEach(async () => {
    const collections = await mongoose.connection.db.collections();
    for (let collection of collections) {
        await collection.deleteMany({});
    }
})

afterAll(async () => {
    if (mongod) {
        await mongod.stop();
    }
    await mongoose.connection.close();
})