import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://gtyoqkgayxdxgmepjxxo.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd0eW9xa2dheXhkeGdtZXBqeHhvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDc4NTI3MjgsImV4cCI6MjAyMzQyODcyOH0.JdKm1h_LuAgYKk4YyBw0kuejWR6lt7XNUm0Lchy5reQ";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
