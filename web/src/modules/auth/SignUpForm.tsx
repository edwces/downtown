import { Button } from "../../common/ui/Button";
import { Paper } from "../../common/ui/Paper";
import { TextField } from "../../common/ui/TextField";

export const SignUpForm = () => {
  return (
    <Paper className="p-8">
      <form>
        <div className="flex flex-col gap-8">
          <TextField id="name" label="Name" />
          <TextField id="email" label="Email" />
          <Button className="mt-5">Sign Up</Button>
        </div>
      </form>
    </Paper>
  );
};
