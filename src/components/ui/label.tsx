import { ComponentPropsWithoutRef, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface LabelProps extends ComponentPropsWithoutRef<"label"> {
  labelText?: string;
  error?: boolean;
  required?: boolean;
}

const Label = forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, children, error, required, labelText, ...props }, ref) => {
    const labelClassName = twMerge(className);

    return (
      <label
        ref={ref}
        className={`${labelClassName} flex w-full flex-col gap-1.5`}
        {...props}
      >
        <div className="flex items-center justify-start gap-1">
          <p className={`text-sm ${error && "text-error"}`}>{labelText}</p>
          {required && (
            <span className="text-sm font-medium text-red-500">*</span>
          )}
        </div>
        {children}
      </label>
    );
  },
);

Label.displayName = "Label";
export default Label;
