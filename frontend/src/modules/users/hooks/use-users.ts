import { useEffect, useState } from "react";
import { usersApi } from "@/modules/users/api/users.api";
import { User } from "@/modules/users/types/user.types";

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadUsers() {
      try {
        setLoading(true);
        const data = await usersApi.findAll();

        // setUsers(data);
        setUsers(data ? (Array.isArray(data) ? data : [data]) : []);
      } catch (error) {
        console.error("Error loading users:", error);
        setError("Failed to load users");
      } finally {
        setLoading(false);
      }
    }
    loadUsers();
  }, []);

  return { users, loading, error };
}
