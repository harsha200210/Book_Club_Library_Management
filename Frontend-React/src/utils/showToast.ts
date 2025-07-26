import { toast } from "react-toastify";
import type {AxiosError} from "axios";

export const showError = (error: unknown, fallbackMessage = "Something went wrong") => {
    if (typeof error === "string") {
        toast.error(error);
    } else if ((error as AxiosError)?.isAxiosError) {
        const axiosError = error as AxiosError<{ message: string }>;
        const message = axiosError.response?.data?.message || fallbackMessage;
        toast.error(message);
    } else if (error instanceof Error) {
        toast.error(error.message || fallbackMessage);
    } else {
        toast.error(fallbackMessage);
    }
};
