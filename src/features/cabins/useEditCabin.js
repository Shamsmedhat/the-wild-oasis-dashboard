import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useEditCabin() {
    const queryClient = useQueryClient();

    const { mutate: editCabin, isPending: isEditing } = useMutation({
        //here we can basically tell React Query what to do ASA the edit was successful
        mutationFn: ({ newCabinData, id }) => createEditCabin(newCabinData, id),
        onSuccess: () => {
            toast.success("Cabin successfully edited");

            queryClient.invalidateQueries({
                queryKey: ["cabins"],
            });
        },

        //here we can basically tell React Query what to do ASA the edit was unsuccessful
        onError: err => toast.error(err.message),
    });

    return { editCabin, isEditing };
}
