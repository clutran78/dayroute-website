import Link from "next/link";

// =============================================================================
// SocialEmbed
//
// Shows DayRoute's latest Facebook posts directly on the website using the
// official Facebook Page Plugin. This is a single <iframe> (no Meta SDK script),
// so it's lightweight and shows posts to visitors WITHOUT them logging in.
//
// IMPORTANT: The feed only appears once the Facebook Page is set to PUBLIC and
// PUBLISHED. If the page is restricted/unpublished, the box shows just a header.
//
// Instagram and LinkedIn don't offer a free, login-free "live feed" embed, so
// we link out to those (those links open the profiles directly).
// =============================================================================

// The public Facebook Page URL, encoded for the plugin's href parameter.
const FB_PAGE_URL = "https://www.facebook.com/profile.php?id=1036987819491182";
const FB_PLUGIN_SRC =
  "https://www.facebook.com/plugins/page.php?" +
  `href=${encodeURIComponent(FB_PAGE_URL)}` +
  "&tabs=timeline&width=500&height=600&small_header=false" +
  "&adapt_container_width=true&hide_cover=false&show_facepile=true";

export function SocialEmbed() {
  return (
    <section className="py-12 sm:py-16 border-t border-border">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
          See what we&apos;re up to
        </h2>
        <p className="mt-3 text-sm sm:text-base text-muted-foreground">
          Tips, updates and behind-the-scenes from DayRoute — straight from our
          Facebook page. No login needed.
        </p>

        {/* Facebook Page Plugin — live timeline, viewable without an account. */}
        <div className="mt-8 flex justify-center">
          <div className="w-full max-w-[500px] overflow-hidden rounded-2xl border border-border bg-card">
            <iframe
              title="DayRoute on Facebook"
              src={FB_PLUGIN_SRC}
              className="w-full"
              height={600}
              style={{ border: "none", overflow: "hidden" }}
              scrolling="no"
              frameBorder="0"
              allowFullScreen
              loading="lazy"
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            />
          </div>
        </div>

        {/* Follow elsewhere — platforms without a free login-free feed embed. */}
        <p className="mt-8 text-sm text-muted-foreground">Also follow us on:</p>
        <div className="mt-4 flex items-center justify-center gap-4">
          <Link
            href="https://www.instagram.com/dayroute2026/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-medium hover:border-primary/50 hover:bg-primary/10 transition-colors"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            Instagram
          </Link>
          <Link
            href="https://www.linkedin.com/company/112463933/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-medium hover:border-primary/50 hover:bg-primary/10 transition-colors"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            LinkedIn
          </Link>
        </div>
      </div>
    </section>
  );
}
