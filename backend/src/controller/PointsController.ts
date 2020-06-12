import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import Points from '../models/Points';

export default class PointsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
      image = 'https://images.unsplash.com/photo-1565061828011-282424b9ab40?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60',
      items,
    } = request.body;

    const pointsRepository = getRepository(Points);

    const pointItems = items
      .split(',')
      .map((item: string) => Number(item.trim()))
      .map((item: number) => {
      return {
        item_id: item,
      };
    });

    const point = await pointsRepository.create({
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
      image: request.file.filename,
      pointItems,
    });

    await pointsRepository.save(point);

    return response.json(point);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const pointsRepository = getRepository(Points);

    const point = await pointsRepository.findOne(id, {
      relations: ['pointItems', 'pointItems.items'],
    });

    if (!point) {
      return response.status(400).json({ message: 'Point not foind' });
    }

    const serializedPoints = {
      ...point,
      image_url: `http://192.168.0.105:3333/uploads/${point.image}`
    }

    const items = point.pointItems.map(pointItem => {
      return {
        title: pointItem.items.title,
      };
    });

    delete point.pointItems;

    return response.json({ point: serializedPoints, items });
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const { uf, city, items } = request.query;

    const parsedItems = String(items)
      .split(',')
      .map(item => Number(item.trim()));

    const pointsRepository = getRepository(Points);

    const points = await pointsRepository
      .createQueryBuilder('points')
      .leftJoin('points.pointItems', 'pointItems')
      .where('points.uf = :uf', { uf })
      .andWhere('points.city = :city', { city })
      .andWhere('pointItems.item_id IN (:...items)', { items: parsedItems })
      .getMany();

    const serializedPoints = points.map(point => {
      return {
        ...point,
        image_url: `http://192.168.0.105:3333/uploads/${point.image}`
      }
    })

    return response.json(points);
  }
}
