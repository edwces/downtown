import { Embeddable, wrap } from '@mikro-orm/core';
import { request, Request, Response } from 'express';
import { User } from '../../db/entities/user/user.entity';
import { HTTP_STATUS } from '../../types/enums';

export const getUsers = async (request: Request, response: Response) => {
  // get all users from database
  // return them in json format
  const users = await request.em.find(User, {});
  response.json(users);
};

export const getUserById = async (request: Request, response: Response) => {
  // get id param
  // find user by id
  // return 404 if not found
  // return user in json format
  const userId = Number.parseInt(request.params.id!);
  try {
    const userFound = await request.em.findOneOrFail(User, userId);
    response.json(userFound);
  } catch {
    response.sendStatus(HTTP_STATUS.NOT_FOUND);
  }
};

export const deleteUserById = async (request: Request, response: Response) => {
  // get id param
  // find user by id
  // return 440 if not found
  // delete and flush to db
  // return succes
  const userId = Number.parseInt(request.params.id!);
  try {
    const userFound = await request.em.findOneOrFail(User, userId);
    await request.em.removeAndFlush(userFound);
    response.json({ succes: true });
  } catch {
    response.sendStatus(HTTP_STATUS.NOT_FOUND);
  }
};

export const updateUserById = async (request: Request, response: Response) => {
  // get id param and validated body
  // find user by id
  // return 404 if not found
  // wrap entity reference
  // assign new body
  // flush to database
  // reponse with updated entity
  const userId = Number.parseInt(request.params.id!);
  const userUpdateDTO = request.body;
  try {
    const userFound = await request.em.findOneOrFail(User, userId);
    const userUpdated = wrap(userFound).assign(userUpdateDTO);
    await request.em.persistAndFlush(userUpdated);
    response.json(userUpdated);
  } catch {
    response.sendStatus(HTTP_STATUS.NOT_FOUND);
  }
};
