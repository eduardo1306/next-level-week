import { Router } from 'express';
import PointsController from '../controller/PointsController';

const pointsRoutes = Router();
const pointsController = new PointsController();

pointsRoutes.get('/', pointsController.index);
pointsRoutes.get('/:id', pointsController.show);
pointsRoutes.post('/', pointsController.create);

export default pointsRoutes;
