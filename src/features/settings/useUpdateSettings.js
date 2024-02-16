import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSettingsForm } from "../../services/apiSettings";
import toast from "react-hot-toast";

export default function useUpdateSettings() {
  const queryClient = useQueryClient();

  const { mutate: updateSetting, isLoading: isUpdating } = useMutation({
    mutationFn: updateSettingsForm,
    onSuccess: () => {
      toast.success("Updated Successfully"),
        queryClient.invalidateQueries({ queryKey: ["settings"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { updateSetting, isUpdating };
}
