import express from 'express';
import UploadFileController from '../controllers/UploadFile.controller';
import UploadFileMiddleware from '../middleware/UploadFile.middleware';

const UploadFileRouter = express.Router();

UploadFileRouter.post('/upload', UploadFileMiddleware.uploadFile().array('file'), UploadFileController.uploadFile);

export default UploadFileRouter;
