
import { createClient } from "@supabase/supabase-js";

// Remplacer par vos propres infos de projet Supabase si besoin
const supabaseUrl = "https://YOUR_SUPABASE_PROJECT_ID.supabase.co";
const supabaseAnonKey = "YOUR_SUPABASE_ANON_KEY";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
