import {
  AggregateCreateNodesError,
  CreateNodesContextV2,
  CreateNodesResult,
  CreateNodesV2,
} from '@nx/devkit';
import { dirname } from 'node:path';

const processFile = (file: string, context: CreateNodesContextV2, port: number) => {
  let projectRoot = '';
  if (file.includes('/.storybook')) {
    projectRoot = dirname(file).replace('/.storybook', '');
  } else {
    projectRoot = dirname(file).replace('.storybook', '');
  }

  return {
    projects: {
      [projectRoot]: {
        root: projectRoot,
        targets: {
          'storybook': {
            command: `storybook dev --port ${port}`,
            options: { cwd: projectRoot },
          },
          'test-storybook': {
            // --index-json option is used as a workaround to avoid storybook test runner to check snapshot outside the project root: https://github.com/storybookjs/test-runner/issues/415#issuecomment-1868117261
            command: `start-server-and-test 'storybook dev --port ${port} --no-open' http://localhost:${port} 'test-storybook --index-json --url=http://localhost:${port}'`,
            options: { cwd: projectRoot },
          }
        },
      }
    }
  }
}


export const createNodesV2: CreateNodesV2 = [
  '**/.storybook/main.{js,ts,mjs,mts,cjs,cts}',
  async (configFiles, options, context) => {
    // Extracted from https://github.com/nrwl/nx/blob/master/packages/nx/src/project-graph/plugins/utils.ts#L7
    const results: Array<[file: string, value: CreateNodesResult]> = [];
    const errors: Array<[file: string, error: Error]> = [];
    await Promise.all(
      configFiles.map(async (file, index) => {
        try {
          const value = processFile(file, context, 3000 + index);
          if (value) {
            results.push([file, value] as const);
          }

        } catch (e) {
          errors.push([file, e as Error] as const);
        }
      }),
    );
    if (errors.length > 0) {
      throw new AggregateCreateNodesError(errors, results);
    }
    return results;
  },
];
