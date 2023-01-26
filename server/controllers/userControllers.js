import Users from '../models/Users.js';
const newUser = async (req, res) => {
  console.log(req.body);

  const user = await new Users(req.body);
  user.save();
  res.json({ msg: 'User Created Succesfully' });
};

export { newUser };
