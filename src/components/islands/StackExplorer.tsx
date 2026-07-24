import { useState, type CSSProperties } from "react";
import { GitHubMark, Icon } from "../Icon";
import { phaseStage, type Project } from "../../data/shaka";

interface Props {
  projects: Project[];
}

const PHASE_NOTE: Record<string, string> = {
  Build: "Render React in Rails and bundle assets.",
  Test: "Exercise real browser flows with Rails test state.",
  Prove: "Compare control and experiment before changes ship.",
  Deploy: "Ship the validated app to production.",
};

interface PhaseGroup {
  phase: string;
  items: { proj: Project; i: number }[];
}

/**
 * Interactive stack explorer (tablist / tabpanel). Click/tap (and keyboard
 * focus) selects a layer; the detail panel re-themes and re-renders. No hover
 * dependency - fully keyboard- and touch-accessible.
 */
export default function StackExplorer({ projects }: Props) {
  const [active, setActive] = useState(0);
  const p = projects[active];
  const github = p.links.find((l) => l[0] === "GitHub");
  const docs = p.links.find((l) => l[0] === "Docs");
  const evidence = p.links.find(
    (l) => l[0] === "v17.0.0" || l[0] === "OSS vs Pro"
  );

  // Group consecutive projects by phase so the visible order follows the stack.
  const phases: PhaseGroup[] = [];
  projects.forEach((proj, i) => {
    const last = phases[phases.length - 1];
    if (last && last.phase === proj.phase) last.items.push({ proj, i });
    else phases.push({ phase: proj.phase, items: [{ proj, i }] });
  });

  return (
    <div className="stack-explorer">
      <div className="se-layers" role="tablist" aria-label="The ShakaStack layers">
        {phases.map((ph, pi) => (
          <div className="se-phase" key={ph.phase}>
            <div className="se-phase-h">
              <span className="se-phase-n">0{pi + 1}</span>
              <span className="se-phase-name">{ph.phase}</span>
              <span className="se-phase-note">{PHASE_NOTE[ph.phase]}</span>
            </div>
            {ph.items.map(({ proj, i }) => (
              <button
                key={proj.id}
                role="tab"
                aria-selected={i === active}
                className={"se-layer" + (i === active ? " active" : "")}
                style={
                  {
                    "--c": `var(--${proj.accent})`,
                    "--cd": `var(--${proj.accent}-deep)`,
                  } as CSSProperties
                }
                onClick={() => setActive(i)}
                onFocus={() => setActive(i)}
              >
                <span className="se-ic">
                  <Icon name={proj.icon} />
                </span>
                <span className="se-l-copy">
                  <span className="se-stage">{proj.stage}</span>
                  <span className="se-name">{proj.name}</span>
                </span>
                <span className="se-idx" aria-hidden="true">
                  {i === active ? "●" : "›"}
                </span>
              </button>
            ))}
          </div>
        ))}
      </div>

      <div
        className="se-detail"
        role="tabpanel"
        style={
          {
            "--c": `var(--${p.accent})`,
            "--cd": `var(--${p.accent}-deep)`,
          } as CSSProperties
        }
      >
        <div className="se-detail-top">
          <div className="se-detail-labels">
            <span className="se-detail-stage">{phaseStage(p)}</span>
            <a href={p.license.href} target="_blank" rel="noreferrer" className="license-badge">
              {p.license.label}
            </a>
          </div>
          <h3>{p.name}</h3>
          <p className="se-detail-tag">{p.tagline}</p>
          <p className="se-detail-blurb">{p.blurb}</p>
        </div>
        <div className="se-detail-benefits">
          {p.benefits.map(([title, desc]) => (
            <div className="se-b" key={title}>
              <span className="se-b-tick">
                <Icon name="check" />
              </span>
              <div>
                <b>{title}</b>
                <span>{desc}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="term">
          <div className="term-bar">
            <i></i>
            <i></i>
            <i></i>
            <span className="tt">{p.domain} - terminal</span>
          </div>
          <div className="term-body">
            <div className="ln">
              <span className="pr">$</span>
              <span>{p.install}</span>
            </div>
            {p.altInstall && (
              <div className="ln">
                <span className="pr">$</span>
                <span>{p.altInstall}</span>
              </div>
            )}
          </div>
        </div>
        <div className="se-detail-foot">
          <a
            className="btn btn-accent"
            style={{ background: "var(--c)", color: "#fff" }}
            href={p.url}
            target="_blank"
            rel="noreferrer"
          >
            Visit {p.domain} <Icon name="arrowUR" />
          </a>
          {github && (
            <a className="btn btn-ghost" href={github[1]} target="_blank" rel="noreferrer">
              <GitHubMark width={15} height={15} /> Source
            </a>
          )}
          {docs && (
            <a className="link-arrow" href={docs[1]} target="_blank" rel="noreferrer">
              Docs <Icon name="arrow" />
            </a>
          )}
          {evidence && (
            <a className="link-arrow" href={evidence[1]} target="_blank" rel="noreferrer">
              {evidence[0]} <Icon name="arrow" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
