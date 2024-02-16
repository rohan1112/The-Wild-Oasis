import supabase from "./supabase";

export async function getSettings() {
  const { data, error } = await supabase.from("settings").select("*").single();

  if (error) {
    console.log(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
}

export async function updateSettingsForm(newSettings) {
  //   console.log(newSettings);
  const { data, error } = await supabase
    .from("settings")
    .update({ ...newSettings })
    .eq("id", 1)
    .select();
  if (error) {
    console.log(error);
    throw new Error("Unable to update Settings");
  }

  return data;
}
