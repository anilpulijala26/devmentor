export interface LessonOutlineItem {
  id: string;
  title: string;
  level: 2 | 3;
}

export function slugifyHeading(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[`~!@#$%^&*()+=[\]{}|\\:;"'<>,.?/]/g, "")
    .replace(/\s+/g, "-");
}

export function extractLessonOutline(source: string): LessonOutlineItem[] {
  const used = new Map<string, number>();
  const outline: LessonOutlineItem[] = [];

  for (const rawLine of source.split("\n")) {
    const line = rawLine.trim();
    const match = line.match(/^(##|###)\s+(.+)$/);

    if (!match) {
      continue;
    }

    const level = match[1].length as 2 | 3;
    const title = match[2].trim();

    if (!title || /^watch\b/i.test(title)) {
      continue;
    }

    const baseId = slugifyHeading(title);
    const count = used.get(baseId) ?? 0;
    used.set(baseId, count + 1);

    outline.push({
      id: count === 0 ? baseId : `${baseId}-${count + 1}`,
      title,
      level,
    });
  }

  return outline;
}
