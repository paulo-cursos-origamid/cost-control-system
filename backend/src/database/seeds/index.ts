import { seedUsers } from './users.seed';
import { seedAccounts } from './accounts.seed';
import { seedCategories } from './categories.seed';
import { seedVehicles } from './vehicles.seed';
import { seedTransactions } from './transactions.seed';
// import { seedCreditCards } from './credit-cards.seed';
import { seedTransfers } from './transfers.seed';
import { seedInstallments } from './installments.seed';
import { seedLedgerEntries } from './ledger-entries.seed';
import { seedRecurringTransactions } from './recurring-transactions.seed';
import { seedFuelSupplies } from './fuel-supplies.seed';
import { seedMaintenances } from './maintenances.seed';

async function main() {
  console.log('🌱 Starting full seed...');

  const users = await seedUsers();

  for (const user of users) {
    console.log(`👤 Seeding user: ${user.email}`);

    const accounts = await seedAccounts(user.id);
    const categories = await seedCategories(user.id);
    const vehicles = await seedVehicles(user.id);
    // const creditCards = await seedCreditCards(user.id);

    await seedTransactions(user.id, accounts, categories, vehicles);

    if (accounts.length >= 2) {
      await seedTransfers(user.id, accounts[0].id, accounts[1].id);
    }

    if (accounts.length > 0 && categories.length > 0) {
      await seedInstallments(user.id, accounts[0].id, categories[0].id);
      await seedLedgerEntries(user.id, accounts[0].id);
      await seedRecurringTransactions(
        user.id,
        accounts[0].id,
        categories[0].id,
      );
    }

    await seedFuelSupplies(vehicles);
    await seedMaintenances(vehicles);

    console.log(`✅ Finished user: ${user.email}`);
  }

  console.log('🚀 Seed completed');
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    process.exit(0);
  });

// import { seedUsers } from './users.seed';
// import { seedCategories } from './categories.seed';
// import { seedAccounts } from './accounts.seed';
// import { seedTransactions } from './transactions.seed';

// async function main() {
//   console.log('🌱 Starting database seed...');

//   const user = await seedUsers();

//   await seedCategories(user.id);

//   await seedAccounts(user.id);

//   await seedTransactions(user.id);

//   console.log('🚀 Seed finished');
// }

// main().catch((error) => {
//   console.error(error);

//   process.exit(1);
// });
