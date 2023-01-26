import Links from '../models/Links.js';
import shortid from 'shortid';

const newLink = async (req, res, next) => {
  // Check if there are errors
  const { original_name, password } = req.body;

  // Create a link Object
  const link = new Links();
  link.url = shortid.generate();
  link.name = shortid.generate();
  link.original_name = original_name;
  link.password = password;

  // If user is authenticated

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
