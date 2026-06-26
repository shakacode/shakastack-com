import { useEffect, useState, type CSSProperties } from "react";
import { Icon } from "../Icon";
import type { Project } from "../../data/shaka";

interface Props {
  projects: Project[];
}

/**
 * The hero "stack card" - auto-cycles the highlighted layer so it's alive on
 * every device. Purely decorative; paused under prefers-reduced-motion.
 */
export default function HeroStackCard({ projects }: Props) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(
      () => setActive((a) => (a + 1) % projects.length),
      2600
    );
    return () => window.clearInterval(id);
  }, [projects.length]);

  return (
    <div className="stack-card">
      <div className="stack-card-head">
        <span className="t">the_shaka_stack.rb</span>
        <span className="t">▟ build → prove</span>
      </div>
      <div className="layers">
        {projects.map((p, i) => (
          <div
            key={p.id}
            className={"layer" + (i === active ? " active" : "")}
            style={{ "--c": `var(--${p.accent})` } as CSSProperties}
          >
            <span className="ic">
              <Icon name={p.icon} />
            </span>
            <span className="lt">
              <span className="stage">{p.stage}</span>
              <span className="nm">{p.name}</span>
            </span>
            <span className="idx">0{i + 1}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
