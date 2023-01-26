import e from 'express';
import multer from 'multer';
import shortid from 'shortid';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const multerConfig = {
  limits: { fileSize: 1000000 },
  storage: (multer.fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, __dirname + '../../uploads');
    },
    filename: (req, file, cb) => {
      const extension = file.mimetype.split('/')[1];
      cb(null, `${shortid.generate()}.${extension}`);
    },
  })),
};
const upload = multer(multerConfig).single('file');

const uploadFile = async (req, res, next) => {
  upload(req, res, async (error) => {
    console.log(error);
    if (!error) {
      res.json({ file: req.file.filename });
    } else {
      console.log(error);
      return next();
    }
  });
};
const deleteFile = async (req, res) => {
  console.log('delete');
};

export { uploadFile, deleteFile };
