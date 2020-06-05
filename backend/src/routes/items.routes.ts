import { Router } from 'express';
import ItemsController from '../controller/ItemsController';

const itemsRoutes = Router();
const itemsController = new ItemsController();

itemsRoutes.get('/', itemsController.index);

export default itemsRoutes;
