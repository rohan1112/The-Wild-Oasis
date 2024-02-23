import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

export default function useGetBookings() {
  const [searchParams] = useSearchParams();

  const filterValue = searchParams.get("status");
  const sortValue = searchParams.get("sortBy") || "start_date-desc";
  const [field, order] = sortValue.split("-");

  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue };

  const sortBy = !sortValue || sortValue === "date" ? null : { field, order };

  const { data: bookings, isLoading } = useQuery({
    queryKey: ["Bookings", filter, sortBy],
    queryFn: () => getBookings({ filter, sortBy }),
  });

  return { bookings, isLoading };
}
