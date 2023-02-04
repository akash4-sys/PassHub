import express from 'express';
import { json } from 'body-parser';
import 'express-async-errors';
import mongoose from 'mongoose';

import { currentUserRouter } from './routes/currentUser';
import { signInRouter } from './routes/signIn';
import { signUpRouter } from './routes/signUp';
import { signOutRouter } from './routes/signOut';
import { errorHandler } from './middleware/errorHandler';
import { NotFoundError } from './errors/notFoundError';

const app = express();
app.use(json());

app.use(currentUserRouter);
app.use(signInRouter);
app.use(signOutRouter);
app.use(signUpRouter);

app.all('*', () => {
    throw new NotFoundError();
});

// ! Throw doesn't works with if the request is async it will end up in infinite loop
// ! because express doesn't listens for request inside the async request
// @ To fix this problem next can be used like this
// app.all('*', async (req, res, next) => {
    // next(new NotFoundError());
// });

app.use(errorHandler);

const start = async () => {
    try {
        await mongoose.connect('mongodb://auth-mongo-srv:27017/auth');
        console.log('Connected to auth database');
    } catch (err) {
        console.log(err);
    }

    app.listen(3000, () => {
        console.log("Listening on port 3000");
    });
}

start();