const User = require("./user-model");

const getUsers = async (req, res) => {
  let users;
  if (req.params.id) {
    users = await User.findById(req.params.id);
  } else {
    users = await User.find();
  }
  res.send(users);
};

const createUser = async (req, res) => {
  const user = await User.create(req.body);
  res.send(user);
};

const putUser = async (req, res) => {
  const deleteToDo = await User.remove();

  const create = await User.create(req.body);
  res.send(create);
};

const deleteData = async (req, res) => {
  try {
    const deleteToDo = await User.remove();
    res.send(deleteToDo);
  } catch (error) {
    res.send(error);
  }
};

module.exports = {
  getUsers,
  createUser,
  putUser,
  deleteData,
};
