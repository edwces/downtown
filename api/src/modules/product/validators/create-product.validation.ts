import { number, string, object } from 'yup';

const createProductSchema = object({
  name: string().min(3).required(),
  price: number().required().positive(),
  category: number().required(),
});

export default createProductSchema;
