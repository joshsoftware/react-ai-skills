# Assets

Binary assets (images, fonts, icons) live here and are Vite-hashed on build.

## Convention

- All images, fonts, and icons under `src/` MUST live in `src/assets/`.
- Two enforcement gates: a PreToolUse hook (`asset-location-guard.sh`) and a pre-commit lint check.
- Files in `public/` (favicon, robots.txt, manifest) are allowed — those are not Vite-processed.
- Re-brands are a single-folder swap when all assets live here.

Import assets in code:

```ts
import logo from '@/assets/logo.svg';
```
