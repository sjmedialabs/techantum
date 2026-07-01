-- Track where each lead came from (homepage hero, contact page, etc.)
ALTER TABLE public.form_submissions
  ADD COLUMN IF NOT EXISTS source text NOT NULL DEFAULT 'contact_page';

CREATE INDEX IF NOT EXISTS idx_form_submissions_source ON public.form_submissions(source);
