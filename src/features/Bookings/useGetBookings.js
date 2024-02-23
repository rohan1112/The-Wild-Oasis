import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

export default function useGetBookings() {
  const [searchParams] = useSearchParams();

  const filterValue = searchParams.get("status");
  const sortValue = searchParams.get("sortBy") || "start_date-desc";
  const [field, order] = sortValue.split("-");

  //1)Filtering
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue };

  //2)Sorting
  const sortBy = !sortValue || sortValue === "date" ? null : { field, order };

  //3)Pagination
  let currentPage = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));

  const { data: { data: bookings, count } = {}, isLoading } = useQuery({
    queryKey: ["Bookings", filter, sortBy, currentPage],
    queryFn: () => getBookings({ filter, sortBy, currentPage }),
  });

  return { bookings, isLoading, count };
}
