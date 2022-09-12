import { forwardRef, useId } from "react";
import { Input, InputProps } from "./Input";

type TextFieldProps = InputProps & {
  label?: string;
  error?: string;
};

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ label, error, ...props }, forwardedRef) => {
    const id = useId();

    return (
      <div className="flex flex-col gap-3">
        {label && (
          <label className="text-md font-semibold" htmlFor={id}>
            {label}
          </label>
        )}
        <Input id={id} {...props} ref={forwardedRef} />
        {error && <p className="text-xs text-red-600">{error}</p>}
      </div>
    );
  }
);
