"use client";

import { SubscriptionsChart } from "../components/charts/subscriptions-chart";
import { RevenueChart } from "../components/charts/revenue-chart";
import { UsersGrowthChart } from "../components/charts/users-growth-chart";

import styles from "./subscriptions-dashboard.module.scss";

export function SubscriptionsDashboard() {
  return (
    <section className={styles.container}>
      <SubscriptionsChart />

      <RevenueChart />

      <UsersGrowthChart />
    </section>
  );
}