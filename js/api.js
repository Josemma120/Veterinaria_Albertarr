// js/api.js
export const api = {
  async login(username, password) {
    const res = await fetch("/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.error || `Error: ${res.status}`);
    }

    return await res.json();   // { id, username, role }
  },

  async list(entity) {
    const res = await fetch(`/${entity}`);
    if (!res.ok) throw new Error(`Error al listar ${entity}`);
    return await res.json();
  },

  async create(entity, data) {
    // Si data contiene un File, usar FormData
    let body, headers = {};
    if (data instanceof FormData) {
      body = data;
    } else {
      body = JSON.stringify(data);
      headers["Content-Type"] = "application/json";
    }

    const res = await fetch(`/${entity}`, {
      method: "POST",
      headers,
      body
    });
    if (!res.ok) throw new Error(`Error al crear ${entity}`);
    return await res.json();
  },

  async update(entity, id, data) {
    let body, headers = {};
    if (data instanceof FormData) {
      body = data;
    } else {
      body = JSON.stringify(data);
      headers["Content-Type"] = "application/json";
    }

    const res = await fetch(`/${entity}/${id}`, {
      method: "PUT",
      headers,
      body
    });
    if (!res.ok) throw new Error(`Error al actualizar ${entity}`);
    return await res.json();
  },

  async remove(entity, id) {
    const res = await fetch(`/${entity}/${id}`, {
      method: "DELETE"
    });
    if (!res.ok) throw new Error(`Error al eliminar ${entity}`);
    return await res.json();
  }
};
