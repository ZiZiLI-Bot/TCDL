import multer from 'multer';
import path from 'path';

const UploadFileMiddleware = {
  uploadFile: (req, res, next) => {
    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, path.join(global.__basedir, '../public/uploads/'));
      },
      filename: (req, file, cb) => {
        cb(null, Date.now() + '_' + file.originalname);
      },
    });
    return multer({ storage });
  },
};

export default UploadFileMiddleware;
