const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function api<T>(
  endpoint: string,
  method: string = "GET",
  body?: any
): Promise<T> {
  const res = await fetch(`${API_URL}${endpoint}`, {
    method,
    credentials: "include", // 🔥 ESSENCIAL
    headers: {
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || "API Error");
  }

  return res.json();
}