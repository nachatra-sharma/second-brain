import express from 'express';
import { handleLogin, handleSignup } from '../../../controllers/auth.js';
const authRouter = express.Router();
authRouter.post('/login', handleLogin);
authRouter.post('/signup', handleSignup);
export default authRouter;
//# sourceMappingURL=index.js.map