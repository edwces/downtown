import util from 'util';
import childProcess from 'child_process';

// TODO: Setup docker here with unique port compared to dev compose

const exec = util.promisify(childProcess.exec);

export default async () => {
  await exec('cd .. && docker compose -f compose.test.yml up --wait');
  await exec('yarn mikro-orm migration:up');
};
