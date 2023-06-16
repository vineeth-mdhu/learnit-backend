const supabaseClient=require('@supabase/supabase-js')
const supabaseUrl = "https://zrpspdmcewacnmnowsap.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpycHNwZG1jZXdhY25tbm93c2FwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY4NTY1NzQxNSwiZXhwIjoyMDAxMjMzNDE1fQ.oFJ2TqwNPY6P8Nwp77CvO1WgkH25QKtMGhHUn-N0MmU"
module.exports = supabaseClient.createClient(supabaseUrl, supabaseAnonKey)  