import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../../common/ui/Button";
import { Paper } from "../../common/ui/Paper";
import { TextField } from "../../common/ui/TextField";
import { SignUpRequestDTO, signUpSchema } from "./request.schemas";

interface SignUpFormProps {
  onSubmit?: (data: SignUpRequestDTO) => void;
}

export const SignUpForm = ({ onSubmit = () => {} }: SignUpFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpRequestDTO>({
    resolver: zodResolver(signUpSchema),
  });

  return (
    <Paper className="p-10">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-8">
          <TextField
            label="Name"
            required
            error={errors.name?.message}
            {...register("name")}
          />
          <TextField
            label="Surname"
            required
            error={errors.surname?.message}
            {...register("surname")}
          />
          <TextField
            label="Email"
            type="email"
            error={errors.email?.message}
            required
            {...register("email")}
          />
          <TextField
            label="Password"
            type="password"
            error={errors.password?.message}
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
