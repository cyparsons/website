import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { getAllPosts } from "@/lib/blog"
import { FadeIn } from "@/components/fade-in"

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Insights on equipment finance operations, COI verification, and pre-funding document workflows from the Swift Stack team.",
  openGraph: {
    title: "Blog | Swift Stack",
    description:
      "Insights on equipment finance operations, COI verification, and pre-funding document workflows.",
    type: "website",
  },
}

function formatDate(dateStr: string) {
  const date = new Date(dateStr + "T00:00:00")
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <main className="relative min-h-screen pt-28 pb-20 md:pt-36 md:pb-28">
      {/* Background */}
      <div className="bg-line-grid-fade pointer-events-none absolute inset-0" aria-hidden="true" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse at 50% 20%, transparent 40%, var(--color-surface) 80%)" }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-[10%] left-[40%] -translate-x-1/2 h-[500px] w-[600px] rounded-full opacity-20 blur-[120px]"
        style={{ background: "radial-gradient(circle, rgba(42, 160, 230, 0.15), transparent 70%)" }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-5xl px-6">
        {/* Header */}
        <FadeIn>
          <p className="mb-4 text-sm font-medium uppercase tracking-widest text-accent">
            Our Blog
          </p>
          <h1 className="text-gradient pb-2 text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
            Insights on Equipment Finance Operations
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-text-secondary">
            How document verification, insurance compliance, and operational efficiency work in practice.
          </p>
        </FadeIn>

        {/* Posts grid */}
        {posts.length > 0 ? (
          <div className="mt-16 grid gap-6 md:grid-cols-2">
            {posts.map((post, i) => (
              <FadeIn key={post.slug} delay={i * 0.1}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="card-modern group flex h-full flex-col p-4 md:p-6"
                >
                  <div className="flex items-center gap-3 text-sm text-text-tertiary">
                    <span>{post.author}</span>
                    <span aria-hidden="true">&middot;</span>
                    <time dateTime={post.date}>{formatDate(post.date)}</time>
                    <span aria-hidden="true">&middot;</span>
                    <span>{post.readTime}</span>
                  </div>

                  <h2 className="mt-3 text-xl font-semibold text-text-primary transition-colors duration-200 group-hover:text-accent md:text-2xl">
                    {post.title}
                  </h2>

                  <p className="mt-3 flex-1 text-base leading-relaxed text-text-secondary">
                    {post.description}
                  </p>

                  <div className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-accent">
                    Read more
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        ) : (
          <FadeIn delay={0.15}>
            <div className="mt-14 rounded-2xl border border-border/60 bg-surface p-12 text-center">
              <p className="text-lg text-text-secondary">
                Posts coming soon. Check back shortly.
              </p>
            </div>
          </FadeIn>
        )}
      </div>
    </main>
  )
}
