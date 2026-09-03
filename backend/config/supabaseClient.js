const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl) {
    throw new Error("SUPABASE_URL is missing from .env");
}

if (!supabaseKey) {
    throw new Error("SUPABASE_KEY is missing from .env");
}

const supabase = createClient(
    supabaseUrl,
    supabaseKey,
    {
        db: {
            schema: "public"
        }
    }
);

module.exports = supabase;