export type JournalEntry = {
  slug: string;
  date: string;
  title: string;
  excerpt: string;
  tag: string;
};

export const JOURNAL_ENTRIES: JournalEntry[] = [];
