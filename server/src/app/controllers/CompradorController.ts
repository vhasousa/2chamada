import { getRepository } from 'typeorm';
import { Request, Response } from 'express';

import Comprador from '../models/Comprador';

class CompradorController {
  public async index(request: Request, response: Response): Promise<Response> {
    const compradoresRepository = getRepository(Comprador);
    const compradores = await compradoresRepository.find({
      select: ['id', 'nome', 'telefone'],
    });

    return response.status(200).json(compradores);
  }

  // public async show(request: Request, response: Response): Promise<Response> {
  //   const { doctor_id } = request.params;

  //   const patientsRepository = getRepository(Comprador);

  //   const specialty = await patientsRepository.findOne(doctor_id, {
  //     select: ['specialty'],
  //   });

  //   return response.status(200).json(specialty);
  // }

  public async store(request: Request, response: Response): Promise<Response> {
    const { nome, telefone } = request.body;

    const compradoresRepository = getRepository(Comprador);

    const compradores = await compradoresRepository.create({ nome, telefone });

    await compradoresRepository.save(compradores);

    return response.status(200).json(compradores);
  }
}

export default new CompradorController();
