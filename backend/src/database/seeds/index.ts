import { seedUsers } from './users.seed';
import { seedCategories } from './categories.seed';
import { seedAccounts } from './accounts.seed';
import { seedTransactions } from './transactions.seed';

async function main() {
  console.log('🌱 Starting database seed...');

  const user = await seedUsers();

  await seedCategories(user.id);

  await seedAccounts(user.id);

  await seedTransactions(user.id);

  console.log('🚀 Seed finished');
}

main().catch((error) => {
  console.error(error);

  process.exit(1);
});
