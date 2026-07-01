import { defaultCmsEntries, type CmsEntry } from './default-content';

export interface CmsEntryRow {
  entry_key: string;
  entry_group: string;
  label: string;
  content?: Record<string, unknown>;
  updated_at?: string;
}

/** Merge DB rows with defaults so every CMS entry always appears in admin. */
export function mergeCmsEntries(dbRows: CmsEntryRow[] | null | undefined): CmsEntryRow[] {
  const dbMap = new Map((dbRows ?? []).map((row) => [row.entry_key, row]));

  return defaultCmsEntries.map((entry) => {
    const dbRow = dbMap.get(entry.entry_key);
    if (dbRow) {
      return {
        entry_key: entry.entry_key,
        entry_group: dbRow.entry_group || entry.entry_group,
        label: dbRow.label || entry.label,
        content: dbRow.content,
        updated_at: dbRow.updated_at,
      };
    }
    return {
      entry_key: entry.entry_key,
      entry_group: entry.entry_group,
      label: entry.label,
    };
  });
}

export function getDefaultEntryMeta(key: string): Pick<CmsEntry, 'entry_group' | 'label'> | undefined {
  const entry = defaultCmsEntries.find((item) => item.entry_key === key);
  if (!entry) return undefined;
  return { entry_group: entry.entry_group, label: entry.label };
}
