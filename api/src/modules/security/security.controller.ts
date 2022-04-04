import { Request, Response } from 'express';
import { User } from '../../db/entities/user/user.entity';
import argon2 from 'argon2';

export const registerUser = async (request: Request, response: Response) => {
  // get user credentials
  // return if user with same email exists
  // hash password and salt it
  // save user in db
  const userDTO = request.body;

  const userFound = await request.em.findOne(User, { email: userDTO.email });
  if (userFound) return response.sendStatus(400);

  const hashedPassword = await argon2.hash(userDTO.password);
  const newUser = request.em.create(User, {
    ...userDTO,
    password: hashedPassword,
  });

  await request.em.persistAndFlush(newUser);

  response.json({ succes: true });
};
