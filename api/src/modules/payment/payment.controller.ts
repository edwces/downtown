import { Request, Response } from 'express';
import { Stripe } from 'stripe';
import config from '../../config';
import { Product } from '../../db/entities/product/product.entity';

const stripe = new Stripe(config.stripe.secret as string, {
  apiVersion: '2020-08-27',
});

export const createSession = async (request: Request, response: Response) => {
  const cartItems: { id: number; quantity: number }[] = request.body;

  const productIds = cartItems.map((item) => item.id);
  const products = await request.em.find(Product, { id: { $in: productIds } });

  const lineProducts = products.map(
    (product): Stripe.Checkout.SessionCreateParams.LineItem => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: product.name,
          images: [product.image],
        },
        unit_amount: Number.parseInt(product.price as unknown as string) * 100,
      },
      quantity: cartItems.find((item) => item.id === product.id)?.quantity,
    })
  );

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    success_url: 'http://localhost:3000/',
    cancel_url: 'http://localhost:3000/',
    line_items: lineProducts,
  });

  response.json({ url: session.url as string });
};
