const BYTES_PER_KB = 1e3;
const BYTES_PER_MB = 1e6;

export function formatBytes(value) {
  if (value >= BYTES_PER_MB) {
    return `${(value / BYTES_PER_MB).toFixed(1)} MB`;
  }

  return `${Math.round(value / BYTES_PER_KB)} KB`;
}

export function formatRepoCount(value) {
  return `${value} ${value === 1 ? 'repo' : 'repos'}`;
}

export function formatPercent(value, digits = 1) {
  return `${value.toFixed(digits)}%`;
}
