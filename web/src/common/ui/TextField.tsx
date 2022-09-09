import { forwardRef, useId } from "react";
import { Input, InputProps } from "./Input";

type TextFieldProps = InputProps & {
  label?: string;
};

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ label, ...props }, forwardedRef) => {
    const id = useId();

    return (
      <div className="flex flex-col gap-3">
        {label && (
          <label className="text-md font-semibold" htmlFor={id}>
            {label}
          </label>
        )}
        <Input id={id} {...props} ref={forwardedRef} />
      </div>
    );
  }
);
