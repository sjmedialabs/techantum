import { getBranding } from '@/lib/cms';
import WhatsAppWidget from './WhatsAppWidget';

export default async function WhatsAppWidgetLoader() {
  const branding = await getBranding();
  return (
    <WhatsAppWidget
      phoneNumber={branding.whatsapp_href}
      message={branding.whatsapp_widget_message}
    />
  );
}
