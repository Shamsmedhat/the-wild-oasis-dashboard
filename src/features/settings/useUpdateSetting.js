import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateSetting as updateSettingApi } from "../../services/apiSettings";

export function useUpateSettings() {
    const queryClient = useQueryClient();

    const { mutate: updateSetting, isPending: isUpdating } = useMutation({
        //here we can basically tell React Query what to do ASA the edit was successful
        mutationFn: updateSettingApi,
        onSuccess: () => {
            toast.success("Setting successfully edited");

            queryClient.invalidateQueries({
                queryKey: ["settings"],
            });
        },

        //here we can basically tell React Query what to do ASA the edit was unsuccessful
        onError: err => toast.error(err.message),
    });

    return { updateSetting, isUpdating };
}
