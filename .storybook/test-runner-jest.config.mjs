import {getJestConfig} from '@storybook/test-runner';
import {fileURLToPath} from 'node:url';

/*
 * The configuration comes from @storybook/test-runner, with one override.
 *
 * Since @storybook/test-runner v0.24 the bundled story transformer
 * (playwright/transform.js) only exports an async `processAsync`. Jest accepts
 * async transformers solely for files it loads as ES modules; the story files
 * here are plain `.js` in a CommonJS package, so Jest insists on a synchronous
 * `process` and fails with "Invalid synchronous transformer module". Point the
 * story transform at a local synchronous bridge that runs the upstream
 * transformer in a worker thread (see testRunnerSyncTransform.cjs).
 */
const testRunnerConfig = getJestConfig();

const upstreamEntry = Object.entries(testRunnerConfig.transform ?? {})
  .find(([, transformer]) => transformer.replaceAll('\\', '/').includes('@storybook/test-runner'));

if (!upstreamEntry) {
  throw new Error('Could not find the @storybook/test-runner story transformer to override; ' +
    'check test-runner-jest.config.mjs against the getJestConfig() output.');
}

export default {
  ...testRunnerConfig,
  // Recycle Jest workers above 1GB heap: over the full story suite a worker
  // otherwise grows past V8's ~2GB default cap and OOMs on the CI runner.
  workerIdleMemoryLimit: '1GB',
  transform: {
    ...testRunnerConfig.transform,
    [upstreamEntry[0]]: fileURLToPath(new URL('./testRunnerSyncTransform.cjs', import.meta.url)),
  },
};
