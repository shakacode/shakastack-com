import { useEffect, useRef, useState } from "react";
import { Icon, GitHubMark } from "../Icon";
import type { Example, Project, ProjectId } from "../../data/shaka";

interface Props {
  examples: Example[];
  projects: Project[];
}

type Filter = "all" | ProjectId;

const PROJ_LABEL: Record<Filter, string> = {
  all: "All",
  ror: "React on Rails",
  shakapacker: "Shakapacker",
  e2e: "E2E on Rails",
  cpflow: "Control Plane Flow",
  shakaperf: "ShakaPerf",
};

const exampleAccent = (example: Example): ProjectId =>
  example.projects.find((project) => project !== "ror") ?? example.projects[0] ?? "ror";

const primaryLinkKind = (example: Example) => example.primaryLinkKind ?? "demo";

function GalleryThumbnail({ example }: { example: Example }) {
  const [failed, setFailed] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const image = imageRef.current;
    if (image?.complete && image.naturalWidth === 0) {
      setFailed(true);
    }
  }, []);

  return (
    <div className={`card-thumb card-thumb-${exampleAccent(example)}`}>
      <span className="card-tag">{example.tag}</span>
      {!example.thumbnail || failed ? (
        <div
          className="card-thumb-fallback"
          role="img"
          aria-label={`${example.name} preview unavailable`}
        >
          <div aria-hidden="true">
            <span>{example.liveLabel ?? "Live demo"}</span>
            <strong>{example.name}</strong>
            <small>Preview temporarily unavailable</small>
          </div>
        </div>
      ) : (
        <img
          ref={imageRef}
          className="card-thumb-image"
          src={example.thumbnail.src}
          alt={example.thumbnail.alt}
          width={960}
          height={540}
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}

/** Client-side example filter by project id, with live counts and empty state. */
export default function GalleryGrid({ examples, projects }: Props) {
  const [filter, setFilter] = useState<Filter>("all");
  const filters: Filter[] = ["all", ...projects.map((p) => p.id)];
  const count = (f: Filter) =>
    f === "all"
      ? examples.length
      : examples.filter((e) => e.projects.includes(f)).length;
  const shown =
    filter === "all"
      ? examples
      : examples.filter((e) => e.projects.includes(filter));

  return (
    <>
      <div className="gallery-controls">
        {filters.map((f) => (
          <button
            key={f}
            className={"filter" + (f === filter ? " active" : "")}
            onClick={() => setFilter(f)}
          >
            {PROJ_LABEL[f]}
            <span className="ct">{count(f)}</span>
          </button>
        ))}
      </div>

      <div className="cards">
        {shown.map((e) => (
          <article className="card" key={e.name}>
            <GalleryThumbnail example={e} />
            <div className="card-body">
              <h3>{e.name}</h3>
              <p>{e.blurb}</p>
              <div className="card-stack">
                {e.stack.map((s) => (
                  <span key={s}>{s}</span>
                ))}
              </div>
              <div className="card-links">
                {e.live ? (
                  <a
                    className={`live live-${primaryLinkKind(e)}`}
                    href={e.live}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Icon name={primaryLinkKind(e) === "artifact" ? "arrowUR" : "play"} />
                    {e.liveLabel ?? "Live demo"}
                  </a>
                ) : (
                  <span className="soon">Demo coming soon</span>
                )}
                <a className="src" href={e.source} target="_blank" rel="noreferrer">
                  <GitHubMark width={14} height={14} /> Source
                </a>
              </div>
            </div>
          </article>
        ))}
        {shown.length === 0 && filter !== "all" && (
          <div className="empty">
            More {PROJ_LABEL[filter]} demos are on the way. In the meantime,
            explore the docs on{" "}
            <a
              className="link-arrow"
              style={{ color: "var(--accent)" }}
              href={projects.find((p) => p.id === filter)!.url}
              target="_blank"
              rel="noreferrer"
            >
              {projects.find((p) => p.id === filter)!.domain}
            </a>
            .
          </div>
        )}
      </div>
    </>
  );
}
