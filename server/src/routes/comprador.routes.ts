import { Router } from 'express';

import CompradorController from '../app/controllers/CompradorController';

const compradoresRouter = Router();

compradoresRouter.get('/', CompradorController.index);
// doctorsRouter.get('/:doctor_id', DoctorController.show);
compradoresRouter.post('/', CompradorController.store);

export default compradoresRouter;
