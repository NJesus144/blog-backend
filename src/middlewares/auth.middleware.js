import jwt from "jsonwebtoken";
import { findByIdService } from "../services/user.service.js";

export const authMiddleware = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    
    if (!authorization) return res.sendStatus(401);

    const parts = authorization.split(" ");

    if (parts.length !== 2) return res.sendStatus(401); 

    const [schema, token] = parts;

    if (schema !== "Bearer") return res.sendStatus(401);

    jwt.verify(token, process.env.SECRET_JWT, async (error, decoded) => {
      if (error) return res.status(401).send({ message: "Token invalid!" });

      const user = await findByIdService(decoded.id);

      if (!user || !user.id)
        return res.status(401).send({ message: "invalid token!" });

      req.userId = user._id;

      return next();
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
