import User from "../models/User.js";

export const createService = (body) => User.create(body);

export const findByIdService = (id) => User.findById(id);

export const findAllService = () => User.find()
