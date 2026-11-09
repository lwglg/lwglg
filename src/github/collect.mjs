import { PER_PAGE } from '../config.mjs';

export async function fetchOwnRepos(client, owner) {
  const repos = [];
  let page = 1;
  let batch;

  do {
    batch = await client.get(`/users/${owner}/repos?per_page=${PER_PAGE}&type=owner&page=${page}`);
    repos.push(...batch);
    page += 1;
  } while (batch.length === PER_PAGE);

  return repos.filter((repo) => !repo.fork);
}

export function mergeCounts(target, source) {
  for (const [name, value] of Object.entries(source)) {
    target[name] = (target[name] ?? 0) + value;
  }

  return target;
}

export async function fetchLanguageBytes(client, owner, repos) {
  const bytes = {};

  for (const repo of repos) {
    const languages = await client.get(`/repos/${owner}/${repo.name}/languages`);

    mergeCounts(bytes, languages);
  }

  return bytes;
}

export function countPrimaryLanguages(repos) {
  const counts = {};

  for (const { language } of repos) {
    if (language) {
      mergeCounts(counts, { [language]: 1 });
    }
  }

  return counts;
}

export async function collectLanguageStats(client, owner) {
  const repos = await fetchOwnRepos(client, owner);

  return {
    bytes: await fetchLanguageBytes(client, owner, repos),
    repos: countPrimaryLanguages(repos),
  };
}
