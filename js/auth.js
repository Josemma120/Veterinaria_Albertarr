import { api } from "./api.js";
import { $ } from "./utils.js";

export async function handleLogin() {
  const username = $("#username").value.trim();
  const password = $("#password").value.trim();

  if (!username || !password) {
    alert("Ingresa usuario y contraseña");
    return;
  }

  try {
    const user = await api.login(username, password);
    localStorage.setItem("alb_session", JSON.stringify(user));
    window.location.href = "app.html";
  } catch (e) {
    console.error(e);
    alert("Credenciales inválidas");
  }
}

export function logout() {
  localStorage.removeItem("alb_session");
  window.location.href = "login.html";
}

// 🔥 ESTA FUNCIÓN FALTABA
export function handleLoginPage() {
  const loginBtn = $("#loginBtn");
  const passwordInput = $("#password");
  
  loginBtn.addEventListener("click", handleLogin);
  passwordInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") handleLogin();
  });
}
