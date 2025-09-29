Contributing
============

Package manager
---------------
This repository uses pnpm as the canonical package manager. Please use pnpm when installing or updating dependencies.

If you need to regenerate the lockfile locally:

1. Remove any other lockfiles (e.g., `package-lock.json`).
2. Run:

```bash
pnpm install --no-frozen-lockfile
```

3. Commit the resulting `pnpm-lock.yaml`.

In CI or Codespaces, the prebuild checks will prefer the existing lockfile. If a lockfile is missing, the prebuild will install without the `--frozen-lockfile` flag to avoid failing the process.
