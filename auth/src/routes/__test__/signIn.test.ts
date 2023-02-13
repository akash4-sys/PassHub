import request from 'supertest';
import app from '../../app';

it('cannot signin with invalid email', async () => {
    await request(app).post("/api/users/signin").send({
        email: 'dev@world.com',
        password: '123456'
    }).expect(400);
});

it('cannot signin with invalid password', async () => {
    global.signup();
    await request(app).post("/api/users/signin").send({
        email: 'test@dev.com',
        password: 'aklsdjfioae'
    }).expect(400);
});

// ! this test only works when test email doesn't exist in database originally
it('sets a cookie after successful signin', async () => {
    global.signup();
    const res = await request(app).post("/api/users/signin").send({
        email: 'test@dev.com',
        password: '123456'
    }).expect(200);
    expect(res.get('Set-Cookie')).toBeDefined();
});