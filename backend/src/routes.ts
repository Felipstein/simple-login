import { Router } from 'express';
import { authController } from './controllers/AuthController';
import { tokenController } from './controllers/TokenController';
import { userController } from './controllers/UserController';
import { ensureAuth } from './middlewares/ensureAuth';

const route = Router();

route.post('/auth/login', authController.login);
route.post('/auth/signup', authController.signup);
route.post('/auth/validate', authController.validate);

route.use(ensureAuth);

route.get('/users', userController.index);
route.get('/users/:id', userController.show);
route.put('/users/:id', userController.update);
route.delete('/users/:id', userController.delete);

route.get('/tokens', tokenController.index);
route.get('/tokens/:userId', tokenController.show);

export { route };
