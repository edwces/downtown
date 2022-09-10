import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../../common/ui/Button";
import { Paper } from "../../common/ui/Paper";
import { TextField } from "../../common/ui/TextField";
import { SignInRequestDTO, signInSchema } from "./request.schemas";

interface SignInFormProps {
  onSubmit?: (data: SignInRequestDTO) => void;
}

export const SignInForm = ({ onSubmit = () => {} }: SignInFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInRequestDTO>({
    resolver: zodResolver(signInSchema),
  });

  return (
    <Paper className="p-10">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-8">
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
            Sign In
          </Button>
        </div>
      </form>
    </Paper>
  );
};
