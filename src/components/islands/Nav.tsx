import { useEffect, useRef, useState } from "react";
import { GitHubMark } from "../Icon";
import { BOOK_A_CALL, GITHUB_ORG } from "../../data/shaka";

/** Sticky nav - fades in its bottom border after the page scrolls past 12px. */
export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const brandRef = useRef<HTMLAnchorElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => setHydrated(true), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const desktopBreakpoint = window.matchMedia("(min-width: 941px)");
    const closeMenuOnDesktop = () => {
      if (!desktopBreakpoint.matches) return;

      if (menuOpen) brandRef.current?.focus();
      setMenuOpen(false);
    };

    closeMenuOnDesktop();
    desktopBreakpoint.addEventListener("change", closeMenuOnDesktop);
    return () => desktopBreakpoint.removeEventListener("change", closeMenuOnDesktop);
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape" || !navRef.current?.contains(event.target as Node)) return;

      setMenuOpen(false);
      menuButtonRef.current?.focus();
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen]);

  const closeMenu = () => {
    setMenuOpen(false);
    window.requestAnimationFrame(() => menuButtonRef.current?.focus());
  };

  const closeMenuFromBrand = () => {
    if (!menuOpen) return;

    setMenuOpen(false);
    window.requestAnimationFrame(() => brandRef.current?.focus());
  };

  return (
    <nav
      ref={navRef}
      className={`nav${scrolled ? " scrolled" : ""}${hydrated ? " nav-hydrated" : ""}`}
    >
      <div className="wrap nav-inner">
        <a
          ref={brandRef}
          className="brand"
          href="/#top"
          aria-label="ShakaStack home"
          onClick={closeMenuFromBrand}
        >
          <span className="mark">🤙</span>
          <span>ShakaStack</span>
        </a>
        <div className="nav-links">
          <a href="/#problem">Why</a>
          <a href="/#stack">The Stack</a>
          <a href="/vs-nextjs">vs Next.js</a>
          <a href="/#examples">Examples</a>
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
        <button
          ref={menuButtonRef}
          className="nav-toggle"
          type="button"
          aria-controls="mobile-navigation"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="sr-only">{menuOpen ? "Close navigation menu" : "Open navigation menu"}</span>
          <span aria-hidden="true" className="nav-toggle-icon" />
        </button>
      </div>
      <div
        id="mobile-navigation"
        className="mobile-navigation"
        hidden={!menuOpen}
        role="group"
        aria-label="Mobile navigation"
      >
        <div className="wrap mobile-navigation-inner">
          <div className="mobile-navigation-links">
            <a href="/#problem" onClick={closeMenu}>Why</a>
            <a href="/#stack" onClick={closeMenu}>The Stack</a>
            <a href="/vs-nextjs" onClick={closeMenu}>vs Next.js</a>
            <a href="/#examples" onClick={closeMenu}>Examples</a>
          </div>
          <div className="mobile-navigation-cta">
            <a
              className="btn btn-ghost"
              href={GITHUB_ORG}
              target="_blank"
              rel="noreferrer"
              onClick={closeMenu}
            >
              <GitHubMark width={16} height={16} />
              GitHub
            </a>
            <a
              className="btn btn-primary"
              href={BOOK_A_CALL}
              target="_blank"
              rel="noreferrer"
              onClick={closeMenu}
            >
              Book a free call
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
