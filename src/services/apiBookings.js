import { PAGE_SIZE } from "../utils/constants";
import supabase from "./supabase";

export async function getBookings({ filter, sortBy, currentPage }) {
  console.log(sortBy);
  let query = supabase
    .from("bookings")
    .select("*, cabins(name), guests(full_name, email)", { count: "exact" });

  //1)filtering
  if (filter) query = query.eq(filter.field, filter.value);

  //2)Sorting
  if (sortBy)
    query = query.order(sortBy.field, {
      ascending: sortBy.order === "asc" ? true : false,
    });

  //3)Pagination
  if (currentPage) {
    const from = (currentPage - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;
    query = query.range(from, to);
  }

  const { data, error, count } = await query;

  if (error) {
    console.log(error);
    throw new error("Could Not get the bookings");
  }

  return { data, count };
}
