import multer from 'multer';
import shortid from 'shortid';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import Links from '../models/Links.js';
import fs from 'fs';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const uploadFile = async (req, res, next) => {
  const multerConfig = {
    limits: { fileSize: req.user ? 1024 * 1024 * 10 : 1024 * 1024 },
    storage: (multer.fileStorage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, __dirname + '../../uploads');
      },
      filename: (req, file, cb) => {
        const extension = file.originalname.substring(
          file.originalname.lastIndexOf('.'),
          file.originalname.length
        );
        cb(null, `${shortid.generate()}${extension}`);
      },
    })),
  };
  const upload = multer(multerConfig).single('file');
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
  console.log(req.file);

  try {
    fs.unlinkSync(__dirname + `/../uploads/${req.file}`);
    console.log('delete succesfully');
  } catch (error) {
    console.log(error);
  }
};

const download = async (req, res, next) => {
  // Get link
  const link = await Links.findOne({ name: req.params.file });

  const file = __dirname + '/../uploads/' + req.params.file;
  res.download(file);

  const { downloads, name } = link;

  if (downloads === 1) {
    console.log('1');
    // Delete file
    req.file = name;
    // Delefe from DB
    await Links.findOneAndRemove(link.id);
    next();
  } else {
    link.downloads--;
    console.log(link);
    await link.save();
    console.log('more than 1');
  }
};
export { uploadFile, deleteFile, download };
