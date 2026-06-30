'use client';

import { useEffect, useState } from 'react';
import type { SiteSeo } from '@/lib/cms/types';
import { defaultSeo } from '@/lib/cms/default-content';

export default function SeoAdminPage() {
  const [form, setForm] = useState<SiteSeo>(defaultSeo);
  const [keywordsText, setKeywordsText] = useState(defaultSeo.keywords.join(', '));
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/api/admin/seo')
      .then((r) => r.json())
      .then((data) => {
        setForm({ ...defaultSeo, ...data });
        setKeywordsText((data.keywords || defaultSeo.keywords).join(', '));
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    try {
      const payload = {
        ...form,
        keywords: keywordsText
          .split(',')
          .map((k) => k.trim())
          .filter(Boolean),
      };
      const res = await fetch('/api/admin/seo', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Save failed');
      setForm(data);
      setMessage('SEO settings saved.');
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-muted-foreground">Loading…</p>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-bricolage text-3xl font-bold text-foreground">SEO</h1>
        <p className="text-muted-foreground mt-1">Global metadata, Open Graph, and search settings.</p>
      </div>

      <form onSubmit={handleSave} className="bg-white rounded-xl border border-border p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Site title</label>
          <input
            value={form.site_title}
            onChange={(e) => setForm({ ...form, site_title: e.target.value })}
            className="w-full rounded-lg border border-border px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Title template</label>
          <input
            value={form.title_template}
            onChange={(e) => setForm({ ...form, title_template: e.target.value })}
            className="w-full rounded-lg border border-border px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Meta description</label>
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            rows={3}
            className="w-full rounded-lg border border-border px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Keywords (comma-separated)</label>
          <textarea
            value={keywordsText}
            onChange={(e) => setKeywordsText(e.target.value)}
            rows={2}
            className="w-full rounded-lg border border-border px-3 py-2 text-sm"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Site URL</label>
            <input
              value={form.site_url}
              onChange={(e) => setForm({ ...form, site_url: e.target.value })}
              className="w-full rounded-lg border border-border px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">OG image URL</label>
            <input
              value={form.og_image_url}
              onChange={(e) => setForm({ ...form, og_image_url: e.target.value })}
              className="w-full rounded-lg border border-border px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Twitter handle</label>
            <input
              value={form.twitter_handle}
              onChange={(e) => setForm({ ...form, twitter_handle: e.target.value })}
              className="w-full rounded-lg border border-border px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Google verification</label>
            <input
              value={form.google_verification}
              onChange={(e) => setForm({ ...form, google_verification: e.target.value })}
              className="w-full rounded-lg border border-border px-3 py-2 text-sm"
            />
          </div>
        </div>

        {message && <p className="text-sm text-muted-foreground">{message}</p>}

        <button
          type="submit"
          disabled={saving}
          className="bg-primary text-primary-foreground px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-primary/90 disabled:opacity-60"
        >
          {saving ? 'Saving…' : 'Save SEO'}
        </button>
      </form>
    </div>
  );
}
