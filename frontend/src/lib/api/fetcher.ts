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

  const data = await res.json().catch(()=> null);

  if (!res.ok) {
   throw new Error(data?.message || "API request failed");
  }

  return res.json();
}
