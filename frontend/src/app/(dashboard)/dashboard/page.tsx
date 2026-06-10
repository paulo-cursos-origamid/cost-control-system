"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api/index";


type User = {
  id: string;
  name: string;
  email: string;
  role: string;
};

export default function DashboardPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await apiFetch.get("/users");
        setUsers(res.data.data);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  const totalUsers = users.length;
  const totalAdmins = users.filter((u) => u.role === "ADMIN").length;

  return (
    <div style={{ padding: 24 }}>
      <h1>Dashboard</h1>

      <div style={{ display: "flex", gap: 16, marginTop: 20 }}>
        <div>
          <h3>Total usuários</h3>
          <p>{totalUsers}</p>
        </div>

        <div>
          <h3>Admins</h3>
          <p>{totalAdmins}</p>
        </div>
      </div>

      <hr style={{ margin: "20px 0" }} />

      <h3>Últimos usuários</h3>

      {loading ? (
        <p>Carregando...</p>
      ) : (
        users.slice(0, 5).map((user) => (
          <div key={user.id}>
            {user.name} - {user.email} - {user.role}
          </div>
        ))
      )}
    </div>
  );
}
