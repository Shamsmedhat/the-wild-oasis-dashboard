import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useCreateCabin() {
    const queryClient = useQueryClient();

    const { mutate: createCabin, isPending: isCreating } = useMutation({
        //here we can basically tell React Query what to do ASA the creation was successful
        mutationFn: createEditCabin,
        onSuccess: () => {
            toast.success("Cabin successfully created");

            queryClient.invalidateQueries({
                queryKey: ["cabins"],
            });
        },

        //here we can basically tell React Query what to do ASA the creation was unsuccessful
        onError: err => toast.error(err.message),
    });

    return { createCabin, isCreating };
}
