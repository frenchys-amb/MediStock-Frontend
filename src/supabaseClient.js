import { createClient } from '@supabase/supabase-js';

// Your Supabase URL and public anon key
const SUPABASE_URL = 'https://osrdqeolfsbnvsvpxgbb.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9zcmRxZW9sZnNibnZzdnB4Z2JiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQxOTYyOTAsImV4cCI6MjAzOTc3MjI5MH0.G4rZL9DY6eAoKwhuNHFkm5zMWyW7ooNDj6nqv8yGUys';

// Create a single instance of the Supabase client
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
