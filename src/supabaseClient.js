import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ctbbducdmwfswupjozwm.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN0YmJkdWNkbXdmc3d1cGpvendtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUxODA1MDYsImV4cCI6MjA2MDc1NjUwNn0.mGeDq5TyJIFYH41gxW7WIf0CQC4HSD0EKnRE71CRP28';

const supabase = createClient(supabaseUrl, supabaseAnonKey);
export default supabase;
