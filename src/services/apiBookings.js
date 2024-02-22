import supabase from "./supabase";

export async function getBookings() {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, cabins(name), guests(full_name, email)");

  if (error) {
    console.log(error);
    throw new error("Could Not get the bookings");
  }

  return data;
}
