import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addOrEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export default function useCreateCabin() {
  const queryClient = useQueryClient();
  const { isLoading: isAdding, mutate: addCabin } = useMutation({
    mutationFn: addOrEditCabin, //(data)=>addOrEditCabin(data)
    onSuccess: () => {
      toast.success("Cabin Added Successfully");

      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      //   reset();
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { isAdding, addCabin };
}
