import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supebaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ""; 

const supabase = createClient(supabaseUrl, supebaseAnonKey,);

export default supabase;

//{ auth: { persistSession: false },} <-- in case I need it 