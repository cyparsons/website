import type { MDXComponents } from "mdx/types"

export const mdxComponents: MDXComponents = {
  h1: (props) => (
    <h1
      className="text-gradient mt-12 mb-6 text-3xl font-bold tracking-tight md:text-4xl"
      {...props}
    />
  ),
  h2: (props) => (
    <h2
      className="text-gradient mt-10 mb-4 text-2xl font-bold tracking-tight md:text-3xl"
      {...props}
    />
  ),
  h3: (props) => (
    <h3
      className="mt-8 mb-3 text-xl font-semibold text-text-primary"
      {...props}
    />
  ),
  p: (props) => (
    <p
      className="mb-5 text-base leading-relaxed text-text-secondary md:text-lg"
      {...props}
    />
  ),
  a: (props) => (
    <a
      className="font-medium text-accent underline decoration-accent/30 underline-offset-2 transition-colors duration-200 hover:text-accent-hover hover:decoration-accent"
      {...props}
    />
  ),
  ul: (props) => (
    <ul className="mb-5 ml-6 list-disc space-y-2 text-text-secondary" {...props} />
  ),
  ol: (props) => (
    <ol className="mb-5 ml-6 list-decimal space-y-2 text-text-secondary" {...props} />
  ),
  li: (props) => (
    <li className="text-base leading-relaxed md:text-lg" {...props} />
  ),
  blockquote: (props) => (
    <blockquote
      className="my-6 border-l-2 border-accent/40 pl-5 italic text-text-secondary"
      {...props}
    />
  ),
  pre: (props) => (
    <pre
      className="my-6 overflow-x-auto rounded-xl border border-border bg-surface-alt p-4 text-sm leading-relaxed"
      {...props}
    />
  ),
  code: (props) => {
    const isInline = typeof props.children === "string"
    if (isInline) {
      return (
        <code
          className="rounded bg-surface-alt px-1.5 py-0.5 text-sm font-medium text-accent"
          {...props}
        />
      )
    }
    return <code {...props} />
  },
  hr: () => <div className="divider-gradient my-10" />,
  img: (props) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img className="my-6 rounded-xl" alt={props.alt ?? ""} {...props} />
  ),
  table: (props) => (
    <div className="my-6 overflow-x-auto">
      <table className="w-full border-collapse text-sm" {...props} />
    </div>
  ),
  th: (props) => (
    <th
      className="border-b border-border px-4 py-2 text-left font-semibold text-text-primary"
      {...props}
    />
  ),
  td: (props) => (
    <td
      className="border-b border-border/50 px-4 py-2 text-text-secondary"
      {...props}
    />
  ),
}
