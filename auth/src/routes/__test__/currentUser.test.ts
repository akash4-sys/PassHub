import request from 'supertest';
import app from '../../app';

it('returns details abouts the current user', async () => {
    // unlike postman or thunderbird, supertest doesn't store the cookie generated during this signup request
    // so it can't accessed in the follow up request
    const authRes = await request(app).post("/api/users/signup").send({
        email: 'test@dev.com',
        password: '123456'
    }).expect(201);

    const cookie = authRes.get('Set-Cookie');
    const res = await request(app).get("/api/users/currentuser").set("Cookie", cookie).send().expect(200);
    expect(res.body.currentUser.email).toEqual('test@dev.com');
});

it('responds with null if not authenticated', async () => {
    const res = await request(app).get('/api/users/currentuser').send().expect(200);
    expect(res.body.currentUser).toBeNull();
})