import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteBooking as deleteBookingApi } from "../../services/apiBookings";

export function useDeleteBooking() {
    const queryClient = useQueryClient();

    // mutate the cabins {delete it}
    const { isPending: isDeleteBooking, mutate: deleteBooking } = useMutation({
        // mutationFn: id => deleteBooking(id),
        mutationFn: deleteBookingApi,

        //here we can basically tell React Query what to do ASA the mutation was successful
        onSuccess: () => {
            toast.success("Cabin successfully deleted");

            queryClient.invalidateQueries({
                queryKey: ["bookings"],
            });
        },

        //here we can basically tell React Query what to do ASA the mutation was unsuccessful
        onError: err => toast.error(err.message),
    });

    return { isDeleteBooking, deleteBooking };
}
