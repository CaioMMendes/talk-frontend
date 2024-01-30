"use client";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { ComponentPropsWithoutRef, forwardRef, useState } from "react";
import { twMerge } from "tailwind-merge";

interface InputProps extends ComponentPropsWithoutRef<"input"> {
  error?: boolean;
  errorMessage?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, errorMessage, type, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState<"password" | "text">(
      "password",
    );
    const handleShowPassword = () => {
      setShowPassword(showPassword === "text" ? "password" : "text");
    };

    const inputClassName = twMerge(
      className,
      " outline-none transition-all pl-2 pr-2 placeholder-primary-3/40 placeholder-opacity-50 border",
      error
        ? "border-red-500"
        : "focus:ring-1 focus:ring-primary-3-dark border-transparent",
    );

    return (
      <div className="flex h-full w-full flex-col items-center">
        <div className="relative flex w-full">
          <input
            ref={ref}
            className={`${inputClassName} ${type === "password" && "!pr-8"}`}
            {...props}
            type={type !== "password" ? type : showPassword}
          />
          {type === "password" && (
            <div
              className="focus-visible:ring-ring absolute	 right-2 top-1/2 -translate-y-1/2 transform cursor-pointer focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50"
              onClick={handleShowPassword}
            >
              {showPassword === "password" ? (
                <EyeOffIcon width={20} height={20} />
              ) : (
                <EyeIcon width={20} height={20} />
              )}
            </div>
          )}
        </div>
        {error && errorMessage && (
          <span className="text-error mt-1 flex w-full items-center justify-start text-xs ">
            {errorMessage}
          </span>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";
export default Input;
// function Input(
//   { className, error, errorMessage, ...props }: InputProps,
//   ref: LegacyRef<HTMLInputElement> | undefined
// ) {
//   const inputClassName = twMerge(
//     className,
//     "rounded-lg border border-primary-2 p-2 text-sm font-normal bg-primary-2/80 placeholder-primary-3 placeholder-opacity-70 outline-none transition-all",
//     error ? "border-red-500" : "focus:ring-1 focus:ring-primary-3"
//   );

//   return (
//     <div className="flex w-full flex-col">
//       <input ref={ref} className={inputClassName} {...props} />
//       {error && errorMessage && (
//         <span className="mt-1 text-xs text-error ">{errorMessage}</span>
//       )}
//     </div>
//   );
// }

// export default forwardRef(Input);
