import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBookingAPI } from "../../services/apiBookings";
import toast from "react-hot-toast";

export default function useDeleteBooking() {
  const queryClient = useQueryClient();

  const { mutate: deleteBooking, isLoading: isDeleting } = useMutation({
    mutationFn: (bookingId) => deleteBookingAPI(bookingId),
    onSuccess: () => {
      toast.success(`Succesfully deleted the booking`);
      queryClient.invalidateQueries({
        queryKey: ["Bookings"],
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { deleteBooking, isDeleting };
}
