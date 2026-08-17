/*
 * Synchronous Jest transformer bridging to @storybook/test-runner's async-only
 * story transformer. Jest only supports async transformers for ES modules, and
 * the story files are plain `.js` in a CommonJS package, so Jest requires a
 * synchronous `process`. synckit runs the upstream transformer in a worker
 * thread and blocks on the result, keeping the upstream transform logic
 * authoritative. See test-runner-jest.config.mjs for how it is wired in.
 */
const {createSyncFn} = require('synckit');

module.exports = {
  process: createSyncFn(require.resolve('./testRunnerSyncTransform.worker.mjs')),
};
