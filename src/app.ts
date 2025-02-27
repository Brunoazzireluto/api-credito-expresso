import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';
import yaml from 'yamljs';
import path from 'path';
import routes from './routes';

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

const swaggerDocument = yaml.load(path.resolve(__dirname, 'swagger.yaml'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/api', routes);

// Error handling
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction): void => {
  console.error(err);
  res.status(500).json({
    status: 'error',
    message: 'Internal server error'
  });
});

export default app;