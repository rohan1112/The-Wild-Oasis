import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";

export default function useGetBookings() {
  const { data: bookings, isLoading } = useQuery({
    queryKey: ["Bookings"],
    queryFn: getBookings,
  });

  return { bookings, isLoading };
}
