import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export default function useDeleteCabin() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: doDeleteCabin } = useMutation({
    mutationFn: (id) => deleteCabin(id),
    onSuccess: () => {
      toast.success("Cabin Succesfully Deleted");
      queryClient.invalidateQueries("cabins");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { isDeleting, doDeleteCabin };
}
