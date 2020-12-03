import { getRepository } from 'typeorm';
import { Request, Response } from 'express';

import Motorista from '../models/Motorista';

class MotoristaController {
  public async index(request: Request, response: Response): Promise<Response> {
    const motoristasRepository = getRepository(Motorista);
    const motoristas = await motoristasRepository.find({
      select: ['id', 'nome'],
    });

    return response.status(200).json(motoristas);
  }

  // public async show(request: Request, response: Response): Promise<Response> {
  //   const { doctor_id } = request.params;

  //   const patientsRepository = getRepository(Motorista);

  //   const specialty = await patientsRepository.findOne(doctor_id, {
  //     select: ['specialty'],
  //   });

  //   return response.status(200).json(specialty);
  // }

  public async store(request: Request, response: Response): Promise<Response> {
    const { nome } = request.body;

    const motoristasRepository = getRepository(Motorista);

    const motoristas = await motoristasRepository.create({ nome });

    await motoristasRepository.save(motoristas);

    return response.status(200).json(motoristas);
  }
}

export default new MotoristaController();
