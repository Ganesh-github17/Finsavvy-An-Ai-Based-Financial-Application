import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://hrkahpywypxhqyirczhz.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhya2FocHl3eXB4aHF5aXJjemh6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg0MzQ1MzMsImV4cCI6MjA2NDAxMDUzM30.HTDCwpeHZ2fPOxQ1hDCTPyn2H4TH36ft0wTYNj57xGQ';

export const supabase = createClient(supabaseUrl, supabaseAnonKey); 