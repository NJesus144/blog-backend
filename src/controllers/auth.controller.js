 
import jwt from "jsonwebtoken";
 
 import { findByIdService } from "../services/user.service.js";
 import { generateToken } from "../services/login.service.js";

 const auth = (req, res) => {
  const SECRET_JWT = process.env.SECRET_JWT;
   const { authorization } = req.headers;

    if (!authorization) return res.sendStatus(401);

    const parts = authorization.split(" ");

    if (parts.length !== 2) return res.sendStatus(401);

    const [schema, token] = parts;

    if (schema !== "Bearer") return res.sendStatus(401);

    jwt.verify(token, SECRET_JWT, async (error, decoded) => {
     try{
      if (error) return res.status(401).send({ message: "Token invalid!" });

      const user = await findByIdService(decoded.id);

      if (!user || !user.id)
        return res.status(401).send({ message: "invalid token!" });

       const token = generateToken(user.id)
      return res.send({status_token: true, token})  
     }catch(error){
      res.status(500).send({ message: err.message });  
     }
   
    });
}

export {auth}