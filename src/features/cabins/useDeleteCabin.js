import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteCabin as deleteCabinApi } from "../../services/apiCabins";

export function useDeleteCabin() {
    const queryClient = useQueryClient();

    // mutate the cabins {delete it}
    const { isPending: isDeleting, mutate: deleteCabin } = useMutation({
        // mutationFn: id => deleteCabin(id),
        mutationFn: deleteCabinApi,

        //here we can basically tell React Query what to do ASA the mutation was successful
        onSuccess: () => {
            toast.success("Cabin successfully deleted");

            queryClient.invalidateQueries({
                queryKey: ["cabins"],
            });
        },

        //here we can basically tell React Query what to do ASA the mutation was unsuccessful
        onError: err => toast.error(err.message),
    });

    return { isDeleting, deleteCabin };
}
