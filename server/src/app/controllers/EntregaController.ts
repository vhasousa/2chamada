import { getRepository } from 'typeorm';
import { Response, Request } from 'express';
import { startOfHour, parseISO, isBefore } from 'date-fns';

import Entrega from '../models/Entrega';

class EntregaController {
  public async index(request: Request, response: Response): Promise<Response> {
    const entregasRepository = getRepository(Entrega);
    const entregas = await entregasRepository.find({
      relations: ['comprador', 'fornecedor', 'motorista'],
      select: ['id', 'data_entrega'],
    });

    return response.status(200).json(entregas);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const entregasRepository = getRepository(Entrega);
    const entrega = await entregasRepository.delete(id);

    return response.status(200).json(entrega);
  }

  public async store(request: Request, response: Response): Promise<Response> {
    const {
      data_entrega,
      comprador_id,
      fornecedor_id,
      motorista_id,
      sucata,
    } = request.body;

    const entregasRepository = getRepository(Entrega);

    const horaDeInicio = startOfHour(parseISO(data_entrega));

    if (isBefore(horaDeInicio, new Date())) {
      return response
        .status(400)
        .json({ error: 'Past date are not permitted' });
    }

    const verificaDisponibilidade = await entregasRepository.findOne({
      where: { data_entrega: horaDeInicio, motorista_id },
    });

    if (verificaDisponibilidade) {
      return response
        .status(400)
        .json({ error: 'Data de entrega não disponível' });
    }

    const entregas = entregasRepository.create({
      data_entrega: horaDeInicio,
      comprador_id,
      fornecedor_id,
      motorista_id,
      sucata,
    });

    await entregasRepository.save(entregas);

    return response.status(200).json(entregas);
  }
}

export default new EntregaController();
