import { createClient } from "@supabase/supabase-js"

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabasePubKey = import.meta.env.VITE_PUB_KEY

const supabase = createClient(supabaseUrl, supabasePubKey)

// const supabase = createClient(supabaseUrl, supabasePubKey, {
//     auth: {
//         flowType: "pkce",
//         autoRefreshToken: true,
//         persistSession: true,
//         detectSessionInUrl: true,
//     },
// })

export default supabase
