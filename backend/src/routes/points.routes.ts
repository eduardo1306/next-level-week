import { Router } from 'express';
import { getRepository } from 'typeorm';
import Points from '../models/Points';
import PointItems from '../models/PointItems';

const pointsRoutes = Router();

pointsRoutes.post('/', async (request, response) => {
  try {
    const {
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
      items,
    }: Points = request.body;

    const pointsRepository = getRepository(Points);
    const point = await pointsRepository.create({
      image: 'no-image',
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
    });

    const pointsItemsRepository = getRepository(PointItems);
    const instanceOfPointItems = items.map((item_id: number) => {
      return {
        point_id: point.id,
        item_id,
      };
    });

    const pointItems = await pointsItemsRepository.create(instanceOfPointItems);
    return response.json(pointItems);
  } catch (err) {
    return response.status(400).send({ message: err.message });
  }
});

export default pointsRoutes;
