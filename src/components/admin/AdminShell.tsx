'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { CMS_PAGE_GROUPS } from '@/lib/cms/admin-nav';

const mainNav = [
  { href: '/admin', label: 'Overview', exact: true },
  { href: '/admin/submissions', label: 'Leads' },
  { href: '/admin/branding', label: 'Branding' },
  { href: '/admin/seo', label: 'SEO' },
];

interface ContentEntry {
  entry_key: string;
  entry_group: string;
  label: string;
}

function navLinkClass(active: boolean, nested = false): string {
  return `block rounded-lg text-sm font-medium transition-colors ${
    nested ? 'px-3 py-1.5 ml-3' : 'px-3 py-2'
  } ${
    active
      ? 'bg-primary/10 text-primary'
      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
  }`;
}

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();
  const [contentEntries, setContentEntries] = useState<ContentEntry[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({});

  useEffect(() => {
    fetch('/api/admin/content')
      .then((r) => r.json())
      .then(setContentEntries)
      .catch(() => {});
  }, []);

  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  const contentGroups = useMemo(
    () =>
      contentEntries.reduce<Record<string, ContentEntry[]>>((acc, entry) => {
        if (!acc[entry.entry_group]) acc[entry.entry_group] = [];
        acc[entry.entry_group].push(entry);
        return acc;
      }, {}),
    [contentEntries]
  );

  useEffect(() => {
    const activeGroup = contentEntries.find((entry) =>
      pathname === `/admin/content/${encodeURIComponent(entry.entry_key)}`
    )?.entry_group;
    if (activeGroup) {
      setExpandedGroups((prev) => ({ ...prev, [activeGroup]: true }));
    }
  }, [pathname, contentEntries]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/admin/login');
    router.refresh();
  };

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname === href || pathname.startsWith(`${href}/`);

  const toggleGroup = (groupId: string) => {
    setExpandedGroups((prev) => ({ ...prev, [groupId]: !prev[groupId] }));
  };

  const sidebar = (
    <div className="flex flex-col h-full">
      <div className="px-4 py-5 border-b border-border">
        <Link href="/admin" className="font-bricolage font-bold text-foreground text-lg">
          TechAntum CMS
        </Link>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        <div className="space-y-1">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={navLinkClass(isActive(item.href, item.exact))}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div>
          <div className="flex items-center justify-between px-3 mb-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Pages
            </p>
            <Link
              href="/admin/content"
              className={`text-xs ${pathname === '/admin/content' ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}
            >
              All
            </Link>
          </div>
          <div className="space-y-1">
            {CMS_PAGE_GROUPS.map((group) => {
              const items = contentGroups[group.id] ?? [];
              if (items.length === 0) return null;
              const isExpanded = expandedGroups[group.id] ?? false;
              const groupActive = items.some(
                (entry) => pathname === `/admin/content/${encodeURIComponent(entry.entry_key)}`
              );

              return (
                <div key={group.id}>
                  <button
                    type="button"
                    onClick={() => toggleGroup(group.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      groupActive
                        ? 'text-primary bg-primary/5'
                        : 'text-foreground hover:bg-muted'
                    }`}
                  >
                    <span>{group.label}</span>
                    <span className="text-xs text-muted-foreground">{isExpanded ? '▾' : '▸'}</span>
                  </button>
                  {isExpanded && (
                    <div className="mt-0.5 mb-2 space-y-0.5">
                      {items.map((entry) => {
                        const href = `/admin/content/${encodeURIComponent(entry.entry_key)}`;
                        return (
                          <Link
                            key={entry.entry_key}
                            href={href}
                            className={navLinkClass(pathname === href, true)}
                            title={entry.entry_key}
                          >
                            {entry.label}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </nav>

      <div className="px-3 py-4 border-t border-border space-y-1">
        <Link
          href="/"
          target="_blank"
          className="block px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-primary hover:bg-muted transition-colors"
        >
          View site
        </Link>
        <button
          type="button"
          onClick={handleSignOut}
          className="w-full text-left px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
        >
          Sign out
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="lg:hidden sticky top-0 z-40 bg-white border-b border-border px-4 h-14 flex items-center justify-between">
        <Link href="/admin" className="font-bricolage font-bold text-foreground">
          TechAntum CMS
        </Link>
        <button
          type="button"
          onClick={() => setSidebarOpen((open) => !open)}
          className="px-3 py-1.5 rounded-lg text-sm font-medium border border-border"
          aria-expanded={sidebarOpen}
        >
          {sidebarOpen ? 'Close' : 'Menu'}
        </button>
      </div>

      {sidebarOpen && (
        <button
          type="button"
          className="lg:hidden fixed inset-0 z-40 bg-black/40"
          aria-label="Close menu"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="lg:flex min-h-screen lg:min-h-[calc(100vh)]">
        <aside
          className={`fixed lg:sticky top-0 z-50 lg:z-auto h-full lg:h-screen w-72 shrink-0 bg-white border-r border-border transform transition-transform duration-200 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          }`}
        >
          {sidebar}
        </aside>

        <main className="flex-1 min-w-0 px-4 sm:px-6 py-8 lg:py-10">{children}</main>
      </div>
    </div>
  );
}
