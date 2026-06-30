'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface ContentRow {
  entry_key: string;
  entry_group: string;
  label: string;
}

export default function ContentAdminPage() {
  const [entries, setEntries] = useState<ContentRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/content')
      .then((r) => r.json())
      .then(setEntries)
      .finally(() => setLoading(false));
  }, []);

  const grouped = entries.reduce<Record<string, ContentRow[]>>((acc, entry) => {
    if (!acc[entry.entry_group]) acc[entry.entry_group] = [];
    acc[entry.entry_group].push(entry);
    return acc;
  }, {});

  if (loading) return <p className="text-muted-foreground">Loading…</p>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-bricolage text-3xl font-bold text-foreground">Content</h1>
        <p className="text-muted-foreground mt-1">Edit page sections and copy across the site.</p>
      </div>

      {Object.entries(grouped).map(([group, items]) => (
        <div key={group} className="bg-white rounded-xl border border-border overflow-hidden">
          <div className="px-5 py-3 border-b border-border bg-muted/30">
            <h2 className="font-semibold capitalize text-foreground">{group}</h2>
          </div>
          <ul className="divide-y divide-border">
            {items.map((item) => (
              <li key={item.entry_key}>
                <Link
                  href={`/admin/content/${encodeURIComponent(item.entry_key)}`}
                  className="flex items-center justify-between px-5 py-4 hover:bg-muted/20 transition-colors"
                >
                  <div>
                    <p className="font-medium text-foreground">{item.label}</p>
                    <p className="text-xs text-muted-foreground">{item.entry_key}</p>
                  </div>
                  <span className="text-sm text-primary">Edit →</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
