import { z } from "zod";

export const signUpSchema = z.object({
  name: z.string().min(1).max(40),
  surname: z.string().min(1).max(40),
  email: z.string().email(),
  password: z.string().min(5).max(50),
});

export type SignUpRequestDTO = z.infer<typeof signUpSchema>;

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(5).max(50),
});

export type SignInRequestDTO = z.infer<typeof signInSchema>;
