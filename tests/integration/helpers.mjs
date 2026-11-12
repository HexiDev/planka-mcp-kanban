export const API_URL = (
  process.env.PLANKA_API_URL ?? "http://localhost:3000/api"
).replace(/\/$/, "");

export const EMAIL = process.env.PLANKA_EMAIL_OR_USERNAME ?? "demo";
export const PASSWORD = process.env.PLANKA_PASSWORD ?? "demo";

export async function request(path, { method = "GET", body, token } = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body === undefined ? undefined : JSON.stringify(body),
  });

  const text = await response.text();
  let json = null;
  try {
    json = text ? JSON.parse(text) : null;
  } catch {
    json = text;
  }

  return { status: response.status, ok: response.ok, json };
}

export async function waitForPlanka({ timeoutMs = 120000, intervalMs = 1000 } = {}) {
  const deadline = Date.now() + timeoutMs;
  let lastError;

  while (Date.now() < deadline) {
    try {
      const { ok } = await request("/terms");
      if (ok) return;
    } catch (error) {
      lastError = error;
    }
    await new Promise((resolve) => setTimeout(resolve, intervalMs));
  }

  throw new Error(`Planka did not become ready: ${lastError ?? "timeout"}`);
}

export async function login() {
  const first = await request("/access-tokens", {
    method: "POST",
    body: { emailOrUsername: EMAIL, password: PASSWORD },
  });

  if (first.ok && first.json?.item) {
    return first.json.item;
  }

  if (
    first.status === 403 &&
    first.json?.message === "Terms acceptance required" &&
    first.json?.pendingToken
  ) {
    const terms = await request("/terms");
    if (!terms.ok) {
      throw new Error(
        `Failed to fetch terms: ${terms.status} ${JSON.stringify(terms.json)}`,
      );
    }

    const accepted = await request("/access-tokens/accept-terms", {
      method: "POST",
      body: {
        pendingToken: first.json.pendingToken,
        signature: terms.json.item.signature,
      },
    });

    if (accepted.ok && accepted.json?.item) {
      return accepted.json.item;
    }

    throw new Error(
      `Terms acceptance failed: ${accepted.status} ${JSON.stringify(accepted.json)}`,
    );
  }

  throw new Error(
    `Login failed: ${first.status} ${JSON.stringify(first.json)}`,
  );
}

export async function createProject(token, name = `CI Test ${Date.now()}`) {
  const { ok, status, json } = await request("/projects", {
    method: "POST",
    token,
    body: { type: "private", name },
  });

  if (!ok) {
    throw new Error(`Create project failed: ${status} ${JSON.stringify(json)}`);
  }

  return json.item.id;
}

export async function deleteProject(token, projectId) {
  await request(`/projects/${projectId}`, { method: "DELETE", token });
}
