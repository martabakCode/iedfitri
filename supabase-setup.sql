-- Database Schema for Eid Wishes Application
-- Run this SQL in your Supabase SQL Editor

-- Drop existing table if exists (optional - for fresh start)
-- DROP TABLE IF EXISTS eid_wishes;

-- Create the eid_wishes table
CREATE TABLE IF NOT EXISTS eid_wishes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  from_name text NOT NULL,
  to_name text NOT NULL,
  message text,
  background_url text,
  template text DEFAULT 'classic',
  music_url text,
  created_at timestamp DEFAULT now()
);

-- Enable Row Level Security (optional - since this is a public app)
ALTER TABLE eid_wishes ENABLE ROW LEVEL SECURITY;

-- Policy to allow anyone to read wishes
CREATE POLICY "Allow public read access" ON eid_wishes
  FOR SELECT USING (true);

-- Policy to allow anyone to insert wishes
CREATE POLICY "Allow public insert access" ON eid_wishes
  FOR INSERT WITH CHECK (true);

-- Note: No update or delete policy needed for this app
