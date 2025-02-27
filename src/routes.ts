import { Router } from 'express';
// import usersRouter from './users.routes';
// import sessionsRouter from './sessions.routes';
import loginRouter from './routes/loginRoutes';

const routes = Router();

routes.use('/login', loginRouter);
// routes.use('/users', usersRouter);
// routes.use('/sessions', sessionsRouter);

export default routes;