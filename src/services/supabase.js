
import { createClient } from '@supabase/supabase-js'

export const supabaseUrl = 'https://pvkvadtgbvddmmnqttjp.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB2a3ZhZHRnYnZkZG1tbnF0dGpwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODg4ODQwOTgsImV4cCI6MjAwNDQ2MDA5OH0.g3q2mJ0zKxZ0ukLa0yZQhwqXW0ay2K0w1RWsDCtGZgQ'
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase