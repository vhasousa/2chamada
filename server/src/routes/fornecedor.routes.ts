import { Router } from 'express';

import FornecedorController from '../app/controllers/FornecedorController';

const fornecedoresRouter = Router();

fornecedoresRouter.get('/', FornecedorController.index);
// doctorsRouter.get('/:doctor_id', DoctorController.show);
fornecedoresRouter.post('/', FornecedorController.store);

export default fornecedoresRouter;
