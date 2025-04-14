/*
  # Create admins table and security policies

  1. New Tables
    - `admins`
      - `id` (uuid, primary key)
      - `email` (text, unique)
      - `full_name` (text)
      - `role` (text)
      - `is_active` (boolean)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `admins` table
    - Add policies for authenticated users to:
      - Read all admin records
      - Create new admin records
      - Update admin records
      - Delete admin records
*/

CREATE TABLE IF NOT EXISTS admins (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  full_name text NOT NULL,
  role text NOT NULL DEFAULT 'admin',
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE admins ENABLE ROW LEVEL SECURITY;

-- Policy to allow authenticated users to read all admin records
CREATE POLICY "Allow authenticated users to read admins"
  ON admins
  FOR SELECT
  TO authenticated
  USING (true);

-- Policy to allow authenticated users to create admin records
CREATE POLICY "Allow authenticated users to create admins"
  ON admins
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Policy to allow authenticated users to update admin records
CREATE POLICY "Allow authenticated users to update admins"
  ON admins
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create a trigger to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_admins_updated_at
  BEFORE UPDATE
  ON admins
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();