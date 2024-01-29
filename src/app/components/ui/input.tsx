import { ComponentPropsWithoutRef, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface InputProps extends ComponentPropsWithoutRef<"input"> {
  error?: boolean;
  errorMessage?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, errorMessage, ...props }, ref) => {
    const inputClassName = twMerge(
      className,
      " placeholder-opacity-70 outline-none transition-all px-2",
      error ? "border-red-500" : "focus:ring-1 focus:ring-primary-3-dark",
    );

    return (
      <div className="flex h-full w-full flex-col items-center">
        <input ref={ref} className={inputClassName} {...props} />
        {error && errorMessage && (
          <span className="mt-1 text-xs text-red-500 ">{errorMessage}</span>
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
//         <span className="mt-1 text-xs text-red-500 ">{errorMessage}</span>
//       )}
//     </div>
//   );
// }

// export default forwardRef(Input);
