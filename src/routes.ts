import { Router } from 'express';
import transactionRoute from './routes/transactionRoutes';
import loginRouter from './routes/loginRoutes';

const routes = Router();

routes.use('/login', loginRouter);
routes.use('/transactions', transactionRoute);
// routes.use('/users', usersRouter);
// routes.use('/sessions', sessionsRouter);

export default routes;