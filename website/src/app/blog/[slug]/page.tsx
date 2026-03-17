import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { MDXRemote } from "next-mdx-remote/rsc"
import { getAllPosts, getPostBySlug } from "@/lib/blog"
import { mdxComponents } from "@/components/mdx-components"
import { ArticleSchema, BreadcrumbSchema } from "@/components/schema"
import { FadeIn } from "@/components/fade-in"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  try {
    const { meta } = getPostBySlug(slug)
    return {
      title: meta.title,
      description: meta.description,
      openGraph: {
        title: `${meta.title} | Swift Stack`,
        description: meta.description,
        type: "article",
        publishedTime: meta.date,
        authors: ["Ethan LaFrance"],
      },
    }
  } catch {
    return { title: "Post Not Found" }
  }
}

function formatDate(dateStr: string) {
  const date = new Date(dateStr + "T00:00:00")
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params

  let meta, content
  try {
    const post = getPostBySlug(slug)
    meta = post.meta
    content = post.content
  } catch {
    notFound()
  }

  const postUrl = `https://swiftstacksolutions.com/blog/${slug}`

  return (
    <>
      <ArticleSchema
        title={meta.title}
        description={meta.description}
        date={meta.date}
        author="Ethan LaFrance"
        url={postUrl}
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Blog", href: "/blog" },
          { name: meta.title, href: `/blog/${slug}` },
        ]}
      />

      <main className="relative pt-28 pb-0 md:pt-36">
        {/* Background */}
        <div className="bg-line-grid-fade pointer-events-none absolute inset-0" aria-hidden="true" />
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(ellipse at 50% 15%, transparent 40%, var(--color-surface) 80%)" }}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute top-[5%] left-[50%] -translate-x-1/2 h-[400px] w-[500px] rounded-full opacity-20 blur-[120px]"
          style={{ background: "radial-gradient(circle, rgba(42, 160, 230, 0.12), transparent 70%)" }}
          aria-hidden="true"
        />

        <article className="relative mx-auto max-w-3xl px-6 pb-20 md:pb-28">
          {/* Back link */}
          <Link
            href="/blog"
            className="mb-8 inline-flex items-center gap-1.5 text-sm font-medium text-text-tertiary transition-colors duration-200 hover:text-accent"
          >
            &larr; Back to Blog
          </Link>

          {/* Post header */}
          <header className="mb-12">
            <h1 className="text-gradient text-3xl font-bold leading-tight tracking-tight md:text-4xl lg:text-5xl">
              {meta.title}
            </h1>

            <div className="mt-5 flex items-center gap-3 text-sm text-text-tertiary">
              <span>{meta.author}</span>
              <span aria-hidden="true">&middot;</span>
              <time dateTime={meta.date}>{formatDate(meta.date)}</time>
              <span aria-hidden="true">&middot;</span>
              <span>{meta.readTime}</span>
            </div>

            <div
              className="mt-8 h-px"
              style={{ background: "linear-gradient(90deg, transparent, var(--color-accent), transparent)" }}
              aria-hidden="true"
            />
          </header>

          {/* Post content */}
          <div className="mdx-content">
            <MDXRemote source={content} components={mdxComponents} />
          </div>
        </article>
      </main>

      {/* Bottom CTA — outside main so it sits flush against footer */}
      <section className="relative overflow-hidden" style={{ backgroundColor: "#0A1628" }}>
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: "linear-gradient(to right, rgba(42, 160, 230, 0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(42, 160, 230, 0.06) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[500px] rounded-full opacity-30 blur-[120px]"
          style={{ background: "radial-gradient(circle, rgba(42, 160, 230, 0.2), transparent 70%)" }}
          aria-hidden="true"
        />

        <div className="relative flex min-h-[80vh] items-center pt-28 pb-16 md:pt-36 md:pb-20">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <FadeIn>
            <h2 className="text-2xl font-bold text-white md:text-3xl">
              Ready to see it in action?
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-slate-400">
              See what changes when your team stops reviewing every COI field by hand.
            </p>
            <div className="mt-8">
              <Link
                href="/contact"
                className="btn-trace inline-flex items-center justify-center px-8 py-3.5 text-base"
              >
                <span>Get Started</span>
              </Link>
            </div>
          </FadeIn>
        </div>
        </div>
      </section>
    </>
  )
}
