import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import app from '../app';
import request from 'supertest';

// adding signup property to global
declare global {
    var signup: () => Promise<string[]>;
}

let mongod: any;
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

// So that we don't have to sign it every time we write a test
global.signup = async () => {
    const email = "test@dev.com";
    const password = "123456";
    const response = await request(app).post('/api/users/signup').send({ email, password }).expect(201);
    return response.get('Set-Cookie');
}