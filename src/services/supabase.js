import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://ziqhehuuhhygzczpdtce.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InppcWhlaHV1aGh5Z3pjenBkdGNlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM1NzEwMjQsImV4cCI6MjA0OTE0NzAyNH0.FobFuHVjCt3Jw76qirPv2Iv7QGNKJiDIpytaOtInXBQ";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
