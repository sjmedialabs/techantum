-- WhatsApp widget message for floating button
ALTER TABLE public.site_branding
  ADD COLUMN IF NOT EXISTS whatsapp_widget_message text;
