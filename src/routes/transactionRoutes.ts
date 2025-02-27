import { Router } from 'express';
import { TransactionController } from '../controllers/transactionController';
// import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import { Middleware } from "../middlewares/userAuthenticated";


const transactionRoute = Router();
const middleware = new Middleware();
const transactionController = new TransactionController();

transactionRoute.post('/', middleware.isAuthenticated.bind(middleware), transactionController.create.bind(transactionController));
transactionRoute.get('/', middleware.isAuthenticated.bind(middleware), transactionController.findAll.bind(transactionController));
transactionRoute.get('/:id', middleware.isAuthenticated.bind(middleware), transactionController.findById.bind(transactionController));
transactionRoute.put('/:id', middleware.isAuthenticated.bind(middleware), transactionController.update.bind(transactionController));
transactionRoute.delete('/:id', middleware.isAuthenticated.bind(middleware), transactionController.delete.bind(transactionController));

export default transactionRoute;