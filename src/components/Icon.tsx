import type { SVGProps } from "react";
import type { IconName } from "../data/shaka";
import { ICON_PATHS, GITHUB_MARK_PATH } from "../lib/iconPaths";

interface IconProps extends SVGProps<SVGSVGElement> {
  name: IconName;
}

/** Stroke icon for use inside React islands. */
export function Icon({ name, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: ICON_PATHS[name] }}
      {...props}
    />
  );
}

/** Solid GitHub mark for use inside React islands. */
export function GitHubMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: GITHUB_MARK_PATH }}
      {...props}
    />
  );
}
