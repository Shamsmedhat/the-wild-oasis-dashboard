import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignup() {
    const { mutate: signup, isPending } = useMutation({
        mutationKey: ["user"],
        // mutationFn: ({ fullName, email, password }) => signupApi({ fullName, email, password }),
        mutationFn: signupApi,
        onSuccess: user => {
            toast.success("Avvount successfully created! please verify the new account from the user's email address");
        },
    });

    return { signup, isPending };
}
