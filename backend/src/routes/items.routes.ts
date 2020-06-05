import { Router } from 'express';
import { getRepository } from 'typeorm';
import Items from '../models/Items';

const itemsRoutes = Router();

itemsRoutes.get('/', async (request, response) => {
  try {
    const itemsRepository = getRepository(Items);
    const items = await itemsRepository.find();

    const serializedItems = items.map(item => {
      return {
        title: item.title,
        image: `https://localhost:3333/uploads/${item.image}`,
      };
    });

    return response.json(serializedItems);
  } catch (err) {
    return response.status(400).send({ message: err.message });
  }
});

export default itemsRoutes;
