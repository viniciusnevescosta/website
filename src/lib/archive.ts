export type DatedEntry = {
  data: {
    date: Date;
  };
};

export type ArchiveMonth<T> = {
  key: string;
  label: string;
  entries: T[];
};

export type ArchiveYear<T> = {
  year: string;
  months: ArchiveMonth<T>[];
};

const monthFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
});

export function groupEntriesByYearAndMonth<T extends DatedEntry>(entries: T[]): ArchiveYear<T>[] {
  const grouped = new Map<string, Map<string, ArchiveMonth<T>>>();

  for (const entry of entries) {
    const { date } = entry.data;
    const year = String(date.getFullYear());
    const monthKey = String(date.getMonth() + 1).padStart(2, "0");
    const monthLabel = monthFormatter.format(date).toLowerCase();

    if (!grouped.has(year)) {
      grouped.set(year, new Map());
    }

    const months = grouped.get(year)!;

    if (!months.has(monthKey)) {
      months.set(monthKey, {
        key: monthKey,
        label: monthLabel,
        entries: [],
      });
    }

    months.get(monthKey)!.entries.push(entry);
  }

  return Array.from(grouped.entries())
    .sort(([yearA], [yearB]) => Number(yearB) - Number(yearA))
    .map(([year, months]) => ({
      year,
      months: Array.from(months.values()).sort((monthA, monthB) =>
        monthB.key.localeCompare(monthA.key),
      ),
    }));
}
