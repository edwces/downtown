import { wrap } from '@mikro-orm/core';
import { NextFunction, Request, Response } from 'express';
import { Cart } from '../../db/entities/cart/cart.entity';
import { CartItem } from '../../db/entities/cart/cartItem.entity';
import { User } from '../../db/entities/user/user.entity';
import ResponseError from '../../errors/response-error';
import { HTTP_STATUS } from '../../types/enums';

export const getUsers = async (request: Request, response: Response) => {
  // get all users from database
  // return them in json format
  const users = await request.em.find(User, {});
  response.json(users);
};

export const getUserById = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  // get id param
  // find user by id
  // return 404 if not found
  // return user in json format
  const userId = Number.parseInt(request.params.id!);
  const userFound = await request.em.findOne(User, userId);
  if (!userFound)
    return next(new ResponseError('User not Found', HTTP_STATUS.NOT_FOUND));

  response.json(userFound);
};

export const deleteUserById = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  // get id param
  // find user by id
  // return 440 if not found
  // delete and flush to db
  // return succes
  const userId = Number.parseInt(request.params.id!);
  const userFound = await request.em.findOne(User, userId);
  if (!userFound)
    return next(new ResponseError('User not Found', HTTP_STATUS.NOT_FOUND));
  await request.em.removeAndFlush(userFound);
  response.json({ succes: true });
};

export const updateUserById = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  // get id param and validated body
  // find user by id
  // return 404 if not found
  // wrap entity reference
  // assign new body
  // flush to database
  // reponse with updated entity
  const userId = Number.parseInt(request.params.id!);
  const userUpdateDTO = request.body;

  const userFound = await request.em.findOne(User, userId);
  if (!userFound)
    return next(new ResponseError('User not Found', HTTP_STATUS.NOT_FOUND));

  const userUpdated = wrap(userFound).assign(userUpdateDTO);
  await request.em.persistAndFlush(userUpdated);
  response.json(userUpdated);
};

// TODO: Reduce load introduced by population of cartItems
export const getUserCart = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const userId = Number.parseInt(request.params.id!);

  const userFound = await request.em.findOne(User, userId, {
    populate: ['cart', 'cart.items', 'cart.items.product'],
  });
  if (!userFound)
    return next(new ResponseError('User not Found', HTTP_STATUS.NOT_FOUND));

  response.json(userFound.cart);
};

export const addProducttoCart = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  // get user Id / cart Id
  // get product id we want to insert
  // get user with cart joined and with products joined
  // check if that user exists
  // get product reference we want to add
  // flush changes to database

  const userId = Number.parseInt(request.params.id!);
  const productId = Number.parseInt(request.body.productId!);

  // get user cart
  const cartFound = await request.em.findOne(Cart, {
    user: userId,
  });
  if (!cartFound)
    return next(new ResponseError('User not Found', HTTP_STATUS.NOT_FOUND));

  // create cartItem if it does not exist else increase quantity
  // we get cartItem that exist in our user cart and with the id we provided
  let cartItem = await request.em.findOne(CartItem, {
    cart: cartFound,
    product: productId,
  });

  if (!cartItem) {
    cartItem = request.em.create(CartItem, {
      quantity: 1,
      cart: cartFound!,
      product: productId,
    });
  } else {
    wrap(cartItem).assign({ quantity: cartItem.quantity + 1 });
  }

  await request.em.persistAndFlush([cartItem, cartFound]);

  response.json(cartFound);
};
