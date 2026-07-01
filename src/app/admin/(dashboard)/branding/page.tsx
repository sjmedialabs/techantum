'use client';

import { useEffect, useState } from 'react';
import type { SiteBranding } from '@/lib/cms/types';
import { defaultBranding, normalizeSiteBranding } from '@/lib/cms/default-content';

type AssetType = 'logo' | 'footer_logo' | 'favicon';

export default function BrandingAdminPage() {
  const [form, setForm] = useState<SiteBranding>(defaultBranding);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState<AssetType | null>(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/api/admin/branding')
      .then((r) => r.json())
      .then((data) => setForm(normalizeSiteBranding(data)))
      .finally(() => setLoading(false));
  }, []);

  const update = (key: keyof SiteBranding, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    try {
      const res = await fetch('/api/admin/branding', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Save failed');
      setForm(normalizeSiteBranding(data));
      setMessage('Branding saved.');
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  const handleAssetUpload = async (type: AssetType, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(type);
    setMessage('');
    try {
      const body = new FormData();
      body.append('file', file);
      body.append('type', type);
      const res = await fetch('/api/admin/upload/logo', { method: 'POST', body });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Upload failed');

      const columnMap: Record<AssetType, keyof SiteBranding> = {
        logo: 'logo_url',
        footer_logo: 'footer_logo_url',
        favicon: 'favicon_url',
      };
      setForm((prev) => ({ ...prev, [columnMap[type]]: data.url }));
      setMessage(`${type.replace('_', ' ')} uploaded.`);
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setUploading(null);
      e.target.value = '';
    }
  };

  const assetBlocks: { type: AssetType; label: string; url: string | null; hint: string }[] = [
    {
      type: 'logo',
      label: 'Navbar logo',
      url: form.logo_url,
      hint: 'Shown in the header. Recommended: transparent PNG, max height 48px.',
    },
    {
      type: 'footer_logo',
      label: 'Footer logo',
      url: form.footer_logo_url,
      hint: 'Shown in the footer. Uses navbar logo if empty.',
    },
    {
      type: 'favicon',
      label: 'Favicon',
      url: form.favicon_url,
      hint: 'Browser tab icon. PNG or ICO, 32×32 or 48×48 recommended.',
    },
  ];

  if (loading) return <p className="text-muted-foreground">Loading…</p>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-bricolage text-3xl font-bold text-foreground">Branding</h1>
        <p className="text-muted-foreground mt-1">Logo, favicon, company name, and contact details.</p>
      </div>

      <form onSubmit={handleSave} className="bg-white rounded-xl border border-border p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {assetBlocks.map(({ type, label, url, hint }) => (
            <div key={type} className="rounded-lg border border-border p-4 space-y-3">
              <p className="text-sm font-medium">{label}</p>
              {url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={url}
                  alt={label}
                  className={`object-contain border border-border rounded-lg ${
                    type === 'favicon' ? 'h-10 w-10' : 'h-14 max-w-full'
                  }`}
                />
              ) : (
                <div className="h-14 w-14 rounded-xl bg-muted flex items-center justify-center text-muted-foreground text-xs">
                  None
                </div>
              )}
              <input
                type="file"
                accept={type === 'favicon' ? 'image/png,image/x-icon,image/vnd.microsoft.icon,image/svg+xml' : 'image/*'}
                onChange={(e) => handleAssetUpload(type, e)}
                disabled={uploading === type}
              />
              <p className="text-xs text-muted-foreground">{hint}</p>
            </div>
          ))}
        </div>

        <div className="rounded-xl border border-border bg-muted/20 p-5 space-y-4">
          <div>
            <h2 className="font-semibold text-foreground">WhatsApp</h2>
            <p className="text-xs text-muted-foreground mt-1">
              Controls the floating WhatsApp button, header/footer links, and contact page.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">WhatsApp number (display)</label>
              <input
                value={form.whatsapp}
                onChange={(e) => update('whatsapp', e.target.value)}
                placeholder="+91 70329 23474"
                className="w-full rounded-lg border border-border px-3 py-2 text-sm bg-white"
              />
              <p className="text-xs text-muted-foreground mt-1">Shown to visitors with formatting.</p>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">WhatsApp number (link)</label>
              <input
                value={form.whatsapp_href}
                onChange={(e) => update('whatsapp_href', e.target.value)}
                placeholder="917032923474"
                className="w-full rounded-lg border border-border px-3 py-2 text-sm bg-white"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Digits only — country code + number, no + or spaces. Used by the floating button.
              </p>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">WhatsApp pre-filled message</label>
            <textarea
              value={form.whatsapp_widget_message ?? ''}
              onChange={(e) => update('whatsapp_widget_message', e.target.value)}
              rows={2}
              placeholder="Hello! I would like to inquire about your services."
              className="w-full rounded-lg border border-border px-3 py-2 text-sm bg-white"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {(
            [
              ['company_name', 'Company name'],
              ['tagline', 'Tagline'],
              ['logo_letter', 'Logo letter (fallback)'],
              ['email', 'Email'],
              ['phone', 'Phone display'],
              ['phone_href', 'Phone link (digits only)'],
            ] as const
          ).map(([key, label]) => (
            <div key={key}>
              <label className="block text-sm font-medium mb-1">{label}</label>
              <input
                value={form[key]}
                onChange={(e) => update(key, e.target.value)}
                className="w-full rounded-lg border border-border px-3 py-2 text-sm"
              />
            </div>
          ))}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Address</label>
          <textarea
            value={form.address}
            onChange={(e) => update('address', e.target.value)}
            rows={3}
            className="w-full rounded-lg border border-border px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Footer description</label>
          <textarea
            value={form.footer_description}
            onChange={(e) => update('footer_description', e.target.value)}
            rows={2}
            className="w-full rounded-lg border border-border px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Copyright text</label>
          <input
            value={form.copyright_text}
            onChange={(e) => update('copyright_text', e.target.value)}
            className="w-full rounded-lg border border-border px-3 py-2 text-sm"
          />
        </div>

        {message && (
          <p className={`text-sm ${message.includes('migration') || message.includes('column') ? 'text-secondary' : 'text-muted-foreground'}`}>
            {message}
          </p>
        )}

        <button
          type="submit"
          disabled={saving}
          className="bg-primary text-primary-foreground px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-primary/90 disabled:opacity-60"
        >
          {saving ? 'Saving…' : 'Save branding'}
        </button>
      </form>
    </div>
  );
}
