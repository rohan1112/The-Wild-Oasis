import supabase from "./supabase";

export async function getBookings({ filter, sortBy }) {
  console.log(sortBy);
  let query = supabase
    .from("bookings")
    .select("*, cabins(name), guests(full_name, email)");

  if (filter) query = query.eq(filter.field, filter.value);

  if (sortBy)
    query = query.order(sortBy.field, {
      ascending: sortBy.order === "asc" ? true : false,
    });
  const { data, error } = await query;
  if (error) {
    console.log(error);
    throw new error("Could Not get the bookings");
  }

  return data;
}
