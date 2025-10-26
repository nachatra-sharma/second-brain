import express from 'express';
import authRouter  from './auth/index.js';
import contentRouter from './content/index.js';
import { checkAuthenticatedUser } from '../../middleware/auth.js';
const v1Router = express.Router();

v1Router.use('/auth', authRouter);
v1Router.use('/content', checkAuthenticatedUser, contentRouter)

export default v1Router;
