import bcrypt from "bcrypt";
import { loginService, generateToken } from "../services/login.service.js";

const login = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password)
  try {
    const user = await loginService(email);

    console.log("usuario encontrado =>", user)

    if (!user) {
      return res
        .status(404)
        .send({ message: "User or password not found." });
    }

    const passwordIsValid = bcrypt.compareSync(password, user.password);

    if (!passwordIsValid) {
      return res.status(400).send({ message: "User or password not found." });
    }

    const token = generateToken(user.id);
    
    res.send({  user, token });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export { login };