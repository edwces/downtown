import { forwardRef } from "react";
import { Input } from "./Input";

interface TextFieldProps {
  label?: string;
  id?: string;
}

export const TextField = forwardRef<HTMLDivElement, TextFieldProps>(
  ({ label, id }, forwardedRef) => {
    return (
      <div ref={forwardedRef} className="flex flex-col gap-3">
        {label && (
          <label className="text-md font-semibold" htmlFor={id}>
            {label}
          </label>
        )}
        <Input id={id} />
      </div>
    );
  }
);
