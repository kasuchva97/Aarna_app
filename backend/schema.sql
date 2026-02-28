-- Create categories table
CREATE TABLE IF NOT EXISTS public.categories (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    type TEXT NOT NULL,
    emoji TEXT NOT NULL,
    description TEXT
);

-- Create stories table
CREATE TABLE IF NOT EXISTS public.stories (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    description TEXT NOT NULL,
    slides JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS) but allow anonymous read access
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stories ENABLE ROW LEVEL SECURITY;

-- Create policies for anonymous reads
CREATE POLICY "Allow anonymous read access for categories" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Allow anonymous read access for stories" ON public.stories FOR SELECT USING (true);

-- Allow anonymous inserts for the migration script (can remove later)
CREATE POLICY "Allow anonymous insert access for categories" ON public.categories FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow anonymous insert access for stories" ON public.stories FOR INSERT WITH CHECK (true);
