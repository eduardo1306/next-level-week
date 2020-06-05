import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import Items from '../models/Items';

export default class ItemsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const itemRepository = getRepository(Items);

    const items = await itemRepository.find();

    const serializedItems = items.map(item => {
      return {
        ...item,
        image_url: `http://localhost:3333/uploads/${item.image}`,
      };
    });

    return response.json(serializedItems);
  }
}
