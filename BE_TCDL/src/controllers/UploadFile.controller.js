import fs from 'fs';
// import sharp from 'sharp';
import { error, success } from '../helpers/Response';
import * as dotenv from 'dotenv';

dotenv.config();
const UploadFileController = {
  uploadFile: async (req, res) => {
    const files = req.files;
    if (!files) {
      return error(res, null, 'Please upload a file!');
    } else {
      const response = files.map((file) => {
        const newName = file.size + '-' + file.originalname.split('.')[0] + '.webp';
        return {
          host: false,
          url: `${process.env.HOSTNAME}/files/${newName}`,
        };
      });
      success(res, response, 200, 'Uploaded the file successfully: ');

      // Handle Resize image
      // files.forEach(async (file) => {
      //   const path = file.path;
      //   const newName = file.size + '-' + file.originalname.split('.')[0] + '.webp';
      //   const newPath = file.destination + newName;

      //   const image = sharp(path);
      //   const imageMetaData = await image.metadata();
      //   if (imageMetaData.width > 1000) {
      //     image.resize(Math.round(imageMetaData.width * 0.5), Math.round(imageMetaData.height * 0.5), {
      //       fit: sharp.fit.fill,
      //     });
      //   }
      //   await image.webp({ quality: 75 }).toFile(newPath);
      //   fs.unlinkSync(path);
      // });
    }
  },
};

export default UploadFileController;
