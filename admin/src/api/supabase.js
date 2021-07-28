import { createClient } from '@supabase/supabase-js'

const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYxODE0ODQ1OSwiZXhwIjoxOTMzNzI0NDU5fQ.omqFtzPgflHHWwwvS33XUAIfAZvZ8AxFTCmigP1qjI8'
const supabaseUrl = 'https://yfmnchewsdrzrnwvquyw.supabase.co'

const supabase = createClient(supabaseUrl, supabaseKey)

export const auth = supabase.auth;
export const sb = supabase;

