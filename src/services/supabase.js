import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://cbhskjvapedefwrhfhef.supabase.co";
const supabaseKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNiaHNranZhcGVkZWZ3cmhmaGVmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI2OTk3OTksImV4cCI6MjAyODI3NTc5OX0.6EU_2Z1FOQQ4oUFfUT9cqMO87xqMmmwlEHm0a3fdcs0";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
