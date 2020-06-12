import { Router } from 'express';
import { celebrate } from 'celebrate';
import multer from 'multer';
import multerConfig from '../config/multer';
import celebrateConfig from '../config/celebrate';
import PointsController from '../controller/PointsController';

const pointsRoutes = Router();
const upload = multer(multerConfig);
const pointsController = new PointsController();

pointsRoutes.get('/', pointsController.index);
pointsRoutes.get('/:id', pointsController.show);
pointsRoutes.post(
  '/',
  upload.single('image'),
  celebrate(celebrateConfig, {
    abortEarly: false,
  }),
  pointsController.create,
);

export default pointsRoutes;
