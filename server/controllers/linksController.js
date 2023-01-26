import Links from '../models/Links.js';
import shortid from 'shortid';
import bcrypt from 'bcrypt';
import { validationResult } from 'express-validator';

const newLink = async (req, res, next) => {
  // Check if there are errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { original_name } = req.body;

  // Create a link Object
  const link = new Links();
  link.url = shortid.generate();
  link.name = shortid.generate();
  link.original_name = original_name;

  // If user is authenticated
  if (req.user) {
    const { password, downloads } = req.body;
    link.password = password;

    // Assing a number of downloads
    if (downloads) {
      link.downloads = downloads;
    }

    if (password) {
      const salt = await bcrypt.genSalt(10);
      link.password = await bcrypt.hash(password, salt);
    }

    link.autor = req.user.id;
  }

  // Save on DB
  try {
    await link.save();
    res.json({ msg: `${link.url}` });
    next();
  } catch (error) {
    console.log(error);
  }
};

export { newLink };
