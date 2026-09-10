export type Chapter = {
  id: string;
  title: string;
  order: number;
  source: string;
};
type Frontmatter = Record<string, string>;

function readFrontmatter(source: string): {
  frontmatter: Frontmatter;
  body: string;
} {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!match) return { frontmatter: {}, body: source };
  const frontmatter = match[1]
    .split(/\r?\n/)
    .reduce<Frontmatter>((values, line) => {
      const separator = line.indexOf(":");
      if (separator === -1) return values;
      const key = line.slice(0, separator).trim();
      const value = line
        .slice(separator + 1)
        .trim()
        .replace(/^['\"]|['\"]$/g, "");
      return key ? { ...values, [key]: value } : values;
    }, {});
  return { frontmatter, body: source.slice(match[0].length) };
}

function firstHeading(source: string) {
  return source.match(/^#\s+(.+)$/m)?.[1].trim();
}

const files = import.meta.glob<string>("./content/**/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
});

export const chapters: Chapter[] = Object.entries(files)
  .map(([path, source]) => {
    const { frontmatter, body } = readFrontmatter(source);
    const fallbackTitle =
      firstHeading(body) ??
      path.split("/").pop()?.replace(/\.md$/, "") ??
      "Untitled";
    return {
      id: path.replace("./content/", "").replace(/\.md$/, ""),
      title: frontmatter.title ?? fallbackTitle,
      order: Number(frontmatter.order) || Number.MAX_SAFE_INTEGER,
      source: body,
    };
  })
  .sort(
    (first, second) =>
      first.order - second.order || first.title.localeCompare(second.title),
  );
