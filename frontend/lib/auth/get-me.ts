export async function getMe() {
  const response = await fetch("http://localhost:3000/api/auth/me", {
    credentials: "include",
    cache: "no-store",
  });

  if (!response.ok) {
    return null;
  }

  return response.json();
}
