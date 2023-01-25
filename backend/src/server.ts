import { app } from './app';

import { prisma } from './database';

async function main() {

  try {
    await prisma.$connect();

    app.listen(3333, () => console.log('Server is running'));
  } catch (err) {
    console.error(err);
    console.error('Server is not running');
  }

}

main();
