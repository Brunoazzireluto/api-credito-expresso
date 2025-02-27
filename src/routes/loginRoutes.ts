import { Router } from 'express';
import {LoginController} from '../controllers/loginController';
// import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const loginRouter = Router();

loginRouter.post('/',  new LoginController().login);
// usersRouter.get('/', ensureAuthenticated, userController.index);

export default loginRouter;