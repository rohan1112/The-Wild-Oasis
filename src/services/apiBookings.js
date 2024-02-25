import { PAGE_SIZE } from "../utils/constants";
import supabase from "./supabase";

export async function getBookings({ filter, sortBy, currentPage }) {
  let query = supabase
    .from("bookings")
    .select("*, cabins(name), guests(full_name, email)", { count: "exact" });

  //1)filtering
  if (filter) {
    query = query.eq(filter.field, filter.value);
  }

  //2)Sorting
  if (sortBy)
    query = query.order(sortBy.field, {
      ascending: sortBy.order === "asc",
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
    throw new Error("Could Not get the bookings");
  }

  return { data, count };
}

export async function getBooking(id) {
  const { data, error } = await supabase
    .from("bookings")
    .select("*,cabins(*),guests(*)")
    .eq("id", id)
    .single();

  if (error) {
    console.log(error);
    throw new Error("Could Not get the bookings");
  }

  return data;
}

export async function updateBooking(id, newBooking) {
  const { data, error } = await supabase
    .from("bookings")
    .update(newBooking)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.log(error);
    throw new Error("Unable to Checked-in");
  }
  return data;
}

export async function deleteBookingAPI(id) {
  const { data, error } = await supabase.from("bookings").delete().eq("id", id);

  if (error) {
    console.log(error);
    throw new Error("Unable to delete booking");
  }
  return data;
}
