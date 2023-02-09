import request from 'supertest';
import app from '../../app';

it('returns a 201 on successful signup', () => {
    return request(app).post("/api/users/signup").send({
        email: 'test@dev.com',
        password: '123456'
    }).expect(201);
});

it('returns a 400 with a invalid email', () => {
    return request(app).post("/api/users/signup").send({
        email: 'test.com',
        password: '123456'
    }).expect(400);
});

it('returns a 400 with a invalid password', () => {
    return request(app).post("/api/users/signup").send({
        email: 'test@dev.com',
        password: '098'  // password invalid by length
    }).expect(400);
});

it('returns a 400 with missing credentials', async () => {
    await request(app).post("/api/users/signup").send({
        email: 'test@dev.com',
    }).expect(400);

    return request(app).post("/api/users/signup").send({
        password: 'akljshfdlhs'
    }).expect(400);
});

it('restricts duplicates emails', async () => {
    await request(app).post("/api/users/signup").send({
        email: 'test@dev.com',
        password: '123456'
    }).expect(201);

    return request(app).post("/api/users/signup").send({
        email: 'test@dev.com',
        password: '123456'
    }).expect(400);
});


it('sets a cookie after successful signup', async () => {
    const res = await request(app).post("/api/users/signup").send({
        email: 'test@dev.com',
        password: '123456'
    }).expect(201);
    expect(res.get('Set-Cookie')).toBeDefined();
});