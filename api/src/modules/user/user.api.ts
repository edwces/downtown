import { Router } from 'express';
import {
  deleteUserById,
  getUserById,
  getUsers,
  updateUserById,
} from './user.controller';

const user = Router();

user.get('/', getUsers);
user.get('/:id', getUserById);
user.delete('/:id', deleteUserById);
user.put('/:id', updateUserById);

export default user;
