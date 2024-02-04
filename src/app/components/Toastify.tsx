import { ToastPosition, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function toastSuccess(
  text: string,
  position: ToastPosition | undefined = "top-center",
) {
  return toast.success(text, {
    position: position,
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
}

export function toastError(
  text: string,
  position: ToastPosition | undefined = "top-center",
) {
  return toast.error(text, {
    position: position,
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
}
