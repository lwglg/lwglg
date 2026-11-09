export const STYLESHEET = `
:root { --fg: #1f2328; --muted: #59636e; --highlight: #1f2328; }
@media (prefers-color-scheme: dark) {
  :root { --fg: #e6edf3; --muted: #9198a1; --highlight: #ffffff; }
}
text { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif; }
.title { font-size: 16px; font-weight: 600; fill: var(--fg); }
.label { font-size: 13px; fill: var(--fg); }
.muted { fill: var(--muted); }
.percent { font-size: 12px; font-weight: 700; fill: #fff; text-anchor: middle; pointer-events: none; }
.outline { fill: transparent; stroke: none; stroke-linejoin: round; pointer-events: all; cursor: pointer; }
.outline:hover { stroke: var(--highlight); stroke-width: 3; }
`;
