import express from 'express'
import { checkAuthenticatedUser } from '../../../middleware/auth.js';
import { handleGetContent } from '../../../controllers/content.js';
const contentRouter = express.Router();

contentRouter.get('/all', checkAuthenticatedUser, handleGetContent)

export default contentRouter
