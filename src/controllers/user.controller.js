import { createService, findAllService } from "../services/user.service.js";

const create = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;

    if (!name || !username || !email || !password) {
      res.status(400).send({
        message: "submit all fields for registration",
      });
    }

    const user = await createService(req.body);

    if (!user) return res.status(400).send({ message: "Error creating User" });

    res.status(201).send({
      message: "User created successfully!",
      user: {
        id: user._id,
        name,
        username,
        email,
      },
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const findAll = async (req, res) => {
  try {
    const users = await findAllService();

    if (users.length === 0)
      return res.status(400).send({ message: "There are no registered users" });

    res.send(users);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export default { create, findAll };
