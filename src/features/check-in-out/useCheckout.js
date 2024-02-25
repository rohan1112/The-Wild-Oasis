import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateBooking } from "../../services/apiBookings";

export default function useCheckout() {
  const queryClient = useQueryClient();

  const { mutate: checkout, isLoading: isCheckingOut } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, { status: "checked-out" }),
    onSuccess: (data) => {
      toast.success(`Sucessfully checked out with id #${data.id}`);
      queryClient.invalidateQueries({ active: true });
    },
    onError: () => {
      toast.error(`Unable to checked out`);
    },
  });
  return { checkout, isCheckingOut };
}
