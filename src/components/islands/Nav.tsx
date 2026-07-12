import { useEffect, useState } from "react";
import { GitHubMark } from "../Icon";
import { BOOK_A_CALL, GITHUB_ORG } from "../../data/shaka";

/** Sticky nav - fades in its bottom border after the page scrolls past 12px. */
export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={"nav" + (scrolled ? " scrolled" : "")}>
      <div className="wrap nav-inner">
        <a className="brand" href="#top">
          <span className="mark">🤙</span>
          <span>ShakaStack</span>
        </a>
        <div className="nav-links">
          <a href="#problem">Why</a>
          <a href="#stack">The Stack</a>
          <a href="#vs-nextjs">vs Next.js</a>
          <a href="#examples">Examples</a>
        </div>
        <div className="nav-cta">
          <a
            className="btn btn-ghost"
            href={GITHUB_ORG}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
          >
            <GitHubMark width={16} height={16} />
            <span className="nav-cta-label">GitHub</span>
          </a>
          <a className="btn btn-primary" href={BOOK_A_CALL} target="_blank" rel="noreferrer">
            Book a free call
          </a>
        </div>
      </div>
    </nav>
  );
}
