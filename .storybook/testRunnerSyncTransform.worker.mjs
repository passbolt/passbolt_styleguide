/*
 * Worker-thread side of testRunnerSyncTransform.cjs: runs the upstream async
 * story transformer from @storybook/test-runner so its result can be awaited
 * synchronously through synckit.
 */
import {runAsWorker} from 'synckit';

runAsWorker(async(sourceText, sourcePath) =>
  (await import('@storybook/test-runner/playwright/transform.js')).default.processAsync(sourceText, sourcePath));
