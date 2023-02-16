import express from 'express';
import { json } from 'body-parser';
import 'express-async-errors';
import cookieSession from 'cookie-session';
import dotenv from 'dotenv';
import cors from 'cors';

import { currentUserRouter } from './routes/currentUser';
import { signInRouter } from './routes/signIn';
import { signUpRouter } from './routes/signUp';
import { signOutRouter } from './routes/signOut';
import { errorHandler } from './middleware/errorHandler';
import { NotFoundError } from './errors/notFoundError';

// ! Comment out in docker environment
dotenv.config();

const app = express();
app.set('trust proxy', true);       // cause we are using ingress-nginx (otherwise express will consider it insecure)
app.use(json());
app.use(cookieSession({
    signed: false,
    secure: false           // true ? set cookie only on https connection : can set cookie on http
    // secure: process.env.NODE_ENV !== 'test'
}));
app.use(cors());        // added by me since missing during nextjs testing not sure if can cause err in future

app.use(currentUserRouter);
app.use(signInRouter);
app.use(signOutRouter);
app.use(signUpRouter);

app.all('*', () => {
    throw new NotFoundError();
});

// ! Throw doesn't works with if the request is async it will end up in infinite loop
// ! because express doesn't listens for request inside the async request
// @ To fix this problem next can also be used like this
// app.all('*', async (req, res, next) => {
    // next(new NotFoundError());
// });

app.use(errorHandler);

export default app;