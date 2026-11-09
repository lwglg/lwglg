const FULL_TURN = Math.PI * 2;
const EPSILON = 1e-4;

export const START_ANGLE = -Math.PI / 2;

export function polar({ cx, cy }, radius, angle) {
  return { x: cx + radius * Math.cos(angle), y: cy + radius * Math.sin(angle) };
}

const formatPoint = ({ x, y }) => `${x.toFixed(2)} ${y.toFixed(2)}`;

export function arcPath({ cx, cy, outer, inner, start, end }) {
  const center = { cx, cy };
  const stop = Math.min(end, start + FULL_TURN - EPSILON);
  const largeArc = stop - start > Math.PI ? 1 : 0;

  return [
    `M${formatPoint(polar(center, outer, start))}`,
    `A${outer} ${outer} 0 ${largeArc} 1 ${formatPoint(polar(center, outer, stop))}`,
    `L${formatPoint(polar(center, inner, stop))}`,
    `A${inner} ${inner} 0 ${largeArc} 0 ${formatPoint(polar(center, inner, start))}`,
    'Z',
  ].join('');
}

export function layoutSegments(slices) {
  let cursor = START_ANGLE;

  return slices.map((slice) => {
    const end = cursor + (slice.percent / 100) * FULL_TURN;
    const segment = { ...slice, start: cursor, end };

    cursor = end;

    return segment;
  });
}
