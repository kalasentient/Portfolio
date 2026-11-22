import Link from 'next/link';
import type { ComponentProps, ReactNode } from 'react';

function cx(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}

/* ---------- Button ---------- */

type ButtonVariant = 'primary' | 'secondary' | 'ghost';

const buttonBase =
  'inline-flex items-center justify-center gap-2 min-h-12 min-w-12 px-6 py-2 rounded-lg text-label transition-colors ' +
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring ' +
  'disabled:cursor-not-allowed aria-disabled:cursor-not-allowed';

const buttonVariants: Record<ButtonVariant, string> = {
  primary:
    'bg-primary text-primary-foreground hover:bg-primary-hover disabled:bg-disabled disabled:text-disabled-foreground',
  secondary:
    'border border-input text-foreground hover:bg-hover disabled:border-border disabled:text-disabled-foreground disabled:hover:bg-transparent',
  ghost: 'text-link hover:bg-card disabled:text-disabled-foreground disabled:hover:bg-transparent',
};

export function buttonClasses(variant: ButtonVariant = 'primary', className?: string) {
  return cx(buttonBase, buttonVariants[variant], className);
}

export function Button({
  variant = 'primary',
  className,
  ...props
}: ComponentProps<'button'> & { variant?: ButtonVariant }) {
  return <button className={buttonClasses(variant, className)} {...props} />;
}

export function ButtonLink({
  variant = 'primary',
  className,
  ...props
}: ComponentProps<typeof Link> & { variant?: ButtonVariant }) {
  return <Link className={buttonClasses(variant, className)} {...props} />;
}

/* ---------- Tag ---------- */

export function Tag({ children }: { children: ReactNode }) {
  return (
    <li className="inline-flex items-center border border-input px-3 py-1 text-eyebrow text-muted-foreground whitespace-nowrap">
      {children}
    </li>
  );
}

export function TagList({ tags, label = 'Skills' }: { tags: string[]; label?: string }) {
  if (!tags.length) return null;
  return (
    <ul className="flex flex-wrap gap-2" aria-label={label}>
      {tags.map((t) => (
        <Tag key={t}>{t}</Tag>
      ))}
    </ul>
  );
}

/* ---------- Eyebrow ---------- */

export function Eyebrow({ children, className, as: As = 'p' }: { children: ReactNode; className?: string; as?: 'p' | 'span' | 'dt' }) {
  return <As className={cx('text-eyebrow text-muted-foreground', className)}>{children}</As>;
}

/* ---------- Section header ---------- */

export function SectionHeader({
  eyebrow,
  title,
  id,
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  id?: string;
  className?: string;
}) {
  return (
    <div className={cx('flex flex-col gap-4 measure', className)}>
      <span aria-hidden="true" className="block h-1 w-8 bg-accent" />
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 id={id} className="text-h2 text-foreground">
        {title}
      </h2>
    </div>
  );
}

/* ---------- Case study header ---------- */

export function CaseStudyHeader({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro?: ReactNode;
}) {
  return (
    <div className="flex max-w-[1100px] flex-col gap-6">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h1 className="text-display text-foreground">{title}</h1>
      {intro && <p className="text-body-lg text-body measure">{intro}</p>}
    </div>
  );
}

/* ---------- Facts ---------- */

export type Fact = { label: string; value: ReactNode };

export function Facts({ facts }: { facts: Fact[] }) {
  return (
    <dl className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(0,1fr))]">
      {facts.map((f) => (
        <div key={f.label} className="flex flex-col gap-2 border-t border-border pt-3">
          <dt className="text-eyebrow text-muted-foreground">{f.label}</dt>
          <dd className="text-body text-foreground">{f.value}</dd>
        </div>
      ))}
    </dl>
  );
}

/* ---------- Figure ---------- */

type Ratio = '16:9' | '4:3' | '1:1';
const ratioClass: Record<Ratio, string> = {
  '16:9': 'aspect-video',
  '4:3': 'aspect-[4/3]',
  '1:1': 'aspect-square',
};

export function Figure({
  src,
  alt = '',
  number,
  caption,
  ratio = '16:9',
  fit = 'contain',
  priority = false,
  className,
}: {
  src: string;
  alt?: string;
  number?: number;
  caption?: ReactNode;
  ratio?: Ratio;
  fit?: 'contain' | 'cover';
  priority?: boolean;
  className?: string;
}) {
  const label = number !== undefined ? `Fig. ${String(number).padStart(2, '0')}` : undefined;
  return (
    <figure className={cx('flex w-full min-w-0 flex-col gap-3', className)}>
      <div className={cx('w-full overflow-hidden', ratioClass[ratio])}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          className={cx('block h-full w-full max-w-full', fit === 'cover' ? 'object-cover' : 'object-contain')}
        />
      </div>
      {(label || caption) && (
        <figcaption className="flex gap-4 text-muted-foreground">
          {label && <span className="text-eyebrow shrink-0 whitespace-nowrap">{label}</span>}
          {caption && <span className="text-body-sm measure">{caption}</span>}
        </figcaption>
      )}
    </figure>
  );
}

/* ---------- Prose (680px text column) ---------- */

export function Prose({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cx(
        'measure flex flex-col gap-6 text-body text-body',
        '[&_strong]:font-medium [&_strong]:text-foreground',
        '[&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-3 [&_ul]:marker:text-muted-foreground',
        '[&_ul_ul]:list-[circle] [&_ul_ul]:mt-3',
        className
      )}
    >
      {children}
    </div>
  );
}

/* ---------- Section wrapper ---------- */

export function Section({
  children,
  className,
  ...props
}: ComponentProps<'section'>) {
  return (
    <section className={cx('flex flex-col gap-12', className)} {...props}>
      {children}
    </section>
  );
}

export { cx };
