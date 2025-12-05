const API_URL = "http://localhost:8080/api/clientes";

export async function getClients() {
  const res = await fetch(API_URL);

  if (!res.ok) {
    throw new Error("Error obteniendo clientes.");
  }

  return await res.json();
}

export async function createClient(client) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(client),
  });

  if (!res.ok) {
    const msg = await res.text();
    throw new Error("Error creando cliente: " + msg);
  }

  return await res.json();
}
