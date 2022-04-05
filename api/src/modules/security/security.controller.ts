import { Request, Response } from 'express';
import { User } from '../../db/entities/user/user.entity';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import { HTTP_STATUS } from '../../types/enums';
import config from '../../config';

export const registerUser = async (request: Request, response: Response) => {
  // get user credentials
  // return if user with same email exists
  // hash password and salt it
  // save user in db
  const registerDTO = request.body;

  const userFound = await request.em.findOne(User, {
    email: registerDTO.email,
  });
  if (userFound) return response.sendStatus(HTTP_STATUS.CONFLICT);

  const hashedPassword = await argon2.hash(registerDTO.password);
  const newUser = request.em.create(User, {
    ...registerDTO,
    password: hashedPassword,
  });

  await request.em.persistAndFlush(newUser);

  response.status(HTTP_STATUS.CREATED).json({ succes: true });
};

export const loginUser = async (request: Request, response: Response) => {
  // get LoginDTO
  // return if user with email doesn't exist
  // return if password is incorrect
  // create json webtoken
  // return in in response
  const loginDTO = request.body;

  const userFound = await request.em.findOne(User, {
    email: loginDTO.email,
  });
  if (!userFound) return response.sendStatus(HTTP_STATUS.UNAUTHORIZED);

  const isPasswordCorrect = await argon2.verify(
    userFound.password,
    loginDTO.password
  );
  if (!isPasswordCorrect) return response.sendStatus(HTTP_STATUS.UNAUTHORIZED);

  const token = jwt.sign(
    {
      id: userFound.id,
      email: userFound.email,
      username: userFound.name,
      exp: Math.floor(Date.now() / 1000) + 60 * 60,
    },
    config.jwt.secret!
  );

  response.send(token);
};
