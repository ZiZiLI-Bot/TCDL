import express from 'express';
import MedicineController from '../controllers/Medicine.controller';

const MedicineRouter = express.Router();

// MedicineRouter.get('/medicine/:id', MedicineController.getMedicine);
MedicineRouter.get('/medicine/:Slug', MedicineController.getMedicineBySlug);
MedicineRouter.post('/medicine', MedicineController.createMedicine);
MedicineRouter.get('/search/:keyword', MedicineController.searchMedicine);
MedicineRouter.put('/medicine/:id', MedicineController.updateMedicine);

export default MedicineRouter;
