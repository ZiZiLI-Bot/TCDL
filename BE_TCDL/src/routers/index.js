import express from 'express';
import MedicineRouter from './Medicine.routers';
import UploadFileRouter from './UploadFile.routers';

const router = express.Router();

router.use('/', MedicineRouter);
router.use('/', UploadFileRouter);

export default router;
