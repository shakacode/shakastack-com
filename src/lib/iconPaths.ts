/**
 * Inline icon set - simple geometric strokes only.
 * Each entry is the raw inner SVG markup for a 24×24 stroke icon
 * (rendered inside `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" ...>`).
 * Shared by both the Astro `<Icon>` and the React `<Icon>` so paths never drift.
 */
import type { IconName } from "../data/shaka";

export const ICON_PATHS: Record<IconName, string> = {
  build:
    '<path d="M3 7l9-4 9 4-9 4-9-4z"/><path d="M3 12l9 4 9-4"/><path d="M3 17l9 4 9-4"/>',
  bundle:
    '<rect x="3" y="3" width="8" height="8" rx="1.5"/><rect x="13" y="3" width="8" height="8" rx="1.5"/><rect x="3" y="13" width="8" height="8" rx="1.5"/><rect x="13" y="13" width="8" height="8" rx="1.5"/>',
  test:
    '<rect x="4" y="5" width="10" height="8" rx="2"/><rect x="10" y="11" width="10" height="8" rx="2"/><path d="M8 17l2.6 2.6L16.5 13"/><path d="M6.5 8h5M12.5 14h5"/>',
  deploy:
    '<path d="M12 3c4 2 6 5 6 9a6 6 0 0 1-12 0c0-4 2-7 6-9z"/><circle cx="12" cy="11" r="2.2"/><path d="M8 19l-2 2M16 19l2 2"/>',
  prove: '<path d="M3 3v18h18"/><path d="M7 15l4-5 3 3 5-7"/>',
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  arrowUR: '<path d="M7 17L17 7M9 7h8v8"/>',
  check: '<path d="M5 12l4 4L19 7"/>',
  play: '<path d="M6 4l14 8-14 8V4z"/>',
  spark:
    '<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2 2M16 16l2 2M18 6l-2 2M8 16l-2 2"/>',
  layers: '<path d="M12 3l9 5-9 5-9-5 9-5z"/><path d="M3 13l9 5 9-5"/>',
  surf:
    '<path d="M3 18c3 0 3-2 6-2s3 2 6 2 3-2 6-2"/><path d="M5 14C5 8 9 4 19 4c0 8-5 10-10 10"/>',
};

/** Solid (filled) GitHub mark - single path, rendered with fill="currentColor". */
export const GITHUB_MARK_PATH =
  '<path d="M12 1.5A10.5 10.5 0 0 0 8.7 22c.5.1.7-.2.7-.5v-1.8c-2.9.6-3.5-1.4-3.5-1.4-.5-1.2-1.2-1.5-1.2-1.5-.9-.6.1-.6.1-.6 1 .1 1.6 1 1.6 1 .9 1.6 2.4 1.1 3 .9.1-.7.4-1.1.6-1.4-2.3-.3-4.7-1.2-4.7-5.2 0-1.1.4-2.1 1-2.8-.1-.3-.5-1.4.1-2.9 0 0 .9-.3 2.8 1.1a9.6 9.6 0 0 1 5 0c1.9-1.4 2.8-1.1 2.8-1.1.6 1.5.2 2.6.1 2.9.7.7 1 1.7 1 2.8 0 4-2.4 4.9-4.7 5.2.4.3.7.9.7 1.9v2.8c0 .3.2.6.7.5A10.5 10.5 0 0 0 12 1.5z"/>';
