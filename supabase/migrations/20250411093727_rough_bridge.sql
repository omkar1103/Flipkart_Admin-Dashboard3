/*
  # Create reviews table and security policies

  1. New Tables
    - `reviews`
      - `id` (uuid, primary key)
      - `product_id` (uuid)
      - `customer_name` (text)
      - `rating` (integer)
      - `comment` (text)
      - `status` (text)
      - `admin_response` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `reviews` table
    - Add policies for authenticated users to:
      - Read all review records
      - Update review status and responses
      - Delete reviews
*/

CREATE TABLE IF NOT EXISTS reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid NOT NULL,
  customer_name text NOT NULL,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment text NOT NULL,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  admin_response text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Policy to allow authenticated users to read all review records
CREATE POLICY "Allow authenticated users to read reviews"
  ON reviews
  FOR SELECT
  TO authenticated
  USING (true);

-- Policy to allow authenticated users to update review status and responses
CREATE POLICY "Allow authenticated users to update reviews"
  ON reviews
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Policy to allow authenticated users to delete reviews
CREATE POLICY "Allow authenticated users to delete reviews"
  ON reviews
  FOR DELETE
  TO authenticated
  USING (true);

-- Create a trigger to update the updated_at timestamp
CREATE TRIGGER update_reviews_updated_at
  BEFORE UPDATE
  ON reviews
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();