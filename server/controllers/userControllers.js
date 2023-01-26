import Users from '../models/Users.js';
const newUser = async (req, res) => {
  // Verify is user is already registered
  const { email } = req.body;
  let user = await Users.findOne({ email });

  if (user) {
    return res.status(400).json({ msg: 'User is already registered' });
  }

  user = await new Users(req.body);
  user.save();

  res.json({ msg: 'User Created Succesfully' });
};

export { newUser };
