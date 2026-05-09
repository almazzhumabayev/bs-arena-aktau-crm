type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  tone?: 'light' | 'dark';
};

export function SectionHeading({ eyebrow, title, description, tone = 'light' }: SectionHeadingProps) {
  const isDark = tone === 'dark';

  return (
    <div className="max-w-3xl">
      {eyebrow ? <p className="text-sm font-semibold uppercase text-arena-amber">{eyebrow}</p> : null}
      <h1 className={`mt-2 text-4xl font-semibold md:text-5xl ${isDark ? 'text-white' : 'text-[#06111f]'}`}>{title}</h1>
      {description ? <p className={`mt-4 text-lg leading-8 ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`}>{description}</p> : null}
    </div>
  );
}
