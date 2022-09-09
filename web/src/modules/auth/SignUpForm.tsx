import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "../../common/ui/Button";
import { Paper } from "../../common/ui/Paper";
import { TextField } from "../../common/ui/TextField";

const signUpSchema = z.object({
  name: z.string().min(1).max(40),
  surname: z.string().min(1).max(40),
  email: z.string().email(),
  password: z.string().min(5).max(50),
});

type SignUpRequestDTO = z.infer<typeof signUpSchema>;

interface SignUpFormProps {
  onSubmit?: (data: SignUpRequestDTO) => void;
}

export const SignUpForm = ({ onSubmit = () => {} }: SignUpFormProps) => {
  const { register, handleSubmit } = useForm<SignUpRequestDTO>({
    resolver: zodResolver(signUpSchema),
  });

  return (
    <Paper className="p-10">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-8">
          <TextField label="Name" required {...register("name")} />
          <TextField label="Surname" required {...register("surname")} />
          <TextField
            label="Email"
            type="email"
            required
            {...register("email")}
          />
          <TextField
            label="Password"
            type="password"
            required
            {...register("password")}
          />
          <Button type="submit" className="mt-5">
            Sign Up
          </Button>
        </div>
      </form>
    </Paper>
  );
};
