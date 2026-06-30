'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import ContentFormEditor from '@/components/admin/ContentFormEditor';
import { getContentSchema } from '@/lib/cms/content-schemas';

export default function ContentEditPage() {
  const params = useParams();
  const router = useRouter();
  const key = decodeURIComponent((params?.key as string) || '');
  const schema = getContentSchema(key);
  const useJsonEditor = !schema || schema.useJsonEditor;

  const [entryGroup, setEntryGroup] = useState('');
  const [label, setLabel] = useState('');
  const [content, setContent] = useState<Record<string, unknown>>({});
  const [jsonText, setJsonText] = useState('{}');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch(`/api/admin/content/${encodeURIComponent(key)}`)
      .then((r) => r.json())
      .then((data) => {
        setEntryGroup(data.entry_group || key.split('.')[0] || 'general');
        setLabel(data.label || key);
        const loaded = data.content || {};
        setContent(loaded);
        setJsonText(JSON.stringify(loaded, null, 2));
      })
      .finally(() => setLoading(false));
  }, [key]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    try {
      let payload = content;
      if (useJsonEditor) {
        payload = JSON.parse(jsonText);
      }
      const res = await fetch(`/api/admin/content/${encodeURIComponent(key)}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ entry_group: entryGroup, label, content: payload }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Save failed');
      setContent(payload);
      setJsonText(JSON.stringify(payload, null, 2));
      setMessage('Content saved.');
      router.refresh();
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'Invalid JSON or save failed');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-muted-foreground">Loading…</p>;

  return (
    <div className="space-y-6">
      <div>
        <button type="button" onClick={() => router.back()} className="text-sm text-primary mb-2">
          ← Back
        </button>
        <h1 className="font-bricolage text-3xl font-bold text-foreground">{label}</h1>
        <p className="text-muted-foreground mt-1">{key}</p>
      </div>

      <form onSubmit={handleSave} className="bg-white rounded-xl border border-border p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Group</label>
            <input
              value={entryGroup}
              onChange={(e) => setEntryGroup(e.target.value)}
              className="w-full rounded-lg border border-border px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Label</label>
            <input
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              className="w-full rounded-lg border border-border px-3 py-2 text-sm"
            />
          </div>
        </div>

        {useJsonEditor ? (
          <div>
            <label className="block text-sm font-medium mb-1">Content (JSON)</label>
            <p className="text-xs text-muted-foreground mb-2">
              Portfolio data uses structured JSON. Edit carefully.
            </p>
            <textarea
              value={jsonText}
              onChange={(e) => setJsonText(e.target.value)}
              rows={24}
              className="w-full rounded-lg border border-border px-3 py-2 text-sm font-mono"
            />
          </div>
        ) : (
          <ContentFormEditor entryKey={key} content={content} onChange={setContent} />
        )}

        {message && <p className="text-sm text-muted-foreground">{message}</p>}
        <button
          type="submit"
          disabled={saving}
          className="bg-primary text-primary-foreground px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-primary/90 disabled:opacity-60"
        >
          {saving ? 'Saving…' : 'Save content'}
        </button>
      </form>
    </div>
  );
}
