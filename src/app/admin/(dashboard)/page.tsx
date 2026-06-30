'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({ contentEntries: 0, formSubmissions: 0 });
  const [seeding, setSeeding] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/api/admin/stats')
      .then((r) => r.json())
      .then(setStats)
      .catch(() => {});
  }, []);

  const handleSeed = async () => {
    setSeeding(true);
    setMessage('');
    try {
      const res = await fetch('/api/admin/seed', { method: 'POST' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Seed failed');
      setMessage(`Seeded ${data.entries} content entries successfully.`);
      const statsRes = await fetch('/api/admin/stats');
      setStats(await statsRes.json());
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'Seed failed');
    } finally {
      setSeeding(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-bricolage text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Manage your website content, branding, and SEO.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl border border-border p-6">
          <p className="text-sm text-muted-foreground">Content entries</p>
          <p className="text-3xl font-bold text-foreground mt-1">{stats.contentEntries}</p>
        </div>
        <div className="bg-white rounded-xl border border-border p-6">
          <p className="text-sm text-muted-foreground">Form submissions</p>
          <p className="text-3xl font-bold text-foreground mt-1">{stats.formSubmissions}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-border p-6 space-y-4">
        <h2 className="font-semibold text-foreground">Quick actions</h2>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/admin/branding"
            className="px-4 py-2 rounded-lg bg-primary/10 text-primary text-sm font-medium hover:bg-primary/15"
          >
            Edit branding
          </Link>
          <Link
            href="/admin/seo"
            className="px-4 py-2 rounded-lg bg-primary/10 text-primary text-sm font-medium hover:bg-primary/15"
          >
            Edit SEO
          </Link>
          <Link
            href="/admin/content"
            className="px-4 py-2 rounded-lg bg-primary/10 text-primary text-sm font-medium hover:bg-primary/15"
          >
            Edit content
          </Link>
          <button
            type="button"
            onClick={handleSeed}
            disabled={seeding}
            className="px-4 py-2 rounded-lg border border-border text-sm font-medium hover:bg-muted disabled:opacity-60"
          >
            {seeding ? 'Seeding…' : 'Seed database from site content'}
          </button>
        </div>
        {message && <p className="text-sm text-muted-foreground">{message}</p>}
        {stats.contentEntries === 0 && (
          <p className="text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-4 py-3">
            No CMS content in the database yet. Click &quot;Seed database from site content&quot; to import
            the current website copy without changing it.
          </p>
        )}
      </div>
    </div>
  );
}
