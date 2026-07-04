// import { seedUsers } from './users.seed';
// import { seedAccounts } from './accounts.seed';
// import { seedCategories } from './categories.seed';
// import { seedVehicles } from './vehicles.seed';
// import { seedTransactions } from './transactions.seed';
// import { seedInstallments } from './installments.seed';
// import { seedLedgerEntries } from './ledger-entries.seed';
// import { seedRecurringTransactions } from './recurring-transactions.seed';
// import { seedCreditCards } from './credit-cards.seed';
// import { seedTransfers } from './transfers.seed';

// async function main() {
//   console.log('🌱 Starting full seed...');

//   const users = await seedUsers();

//   for (const user of users) {
//     const accounts = await seedAccounts(user.id);
//     const categories = await seedCategories(user.id);
//     const vehicles = await seedVehicles(user.id);

//     await seedTransactions(user.id, accounts, categories, vehicles);

//     const cards = await seedCreditCards(user.id);

//     await seedTransfers(user.id, accounts, accounts[0]?.id ?? accounts[0]?.id);

//     await seedInstallments(user.id, accounts[0].id, expenseCategory.id);

//     await seedLedgerEntries(user.id, accounts[0]?.id);

//     await seedRecurringTransactions(user.id, accounts[0]?.id);

//     console.log(`✅ User ${user.email} seeded`);
//   }

//   console.log('🚀 Seed completed');
// }

// main()
//   .catch(console.error)
//   .finally(async () => {
//     process.exit(0);
//   });
