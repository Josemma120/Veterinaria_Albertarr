import { api } from "./api.js";
import { $ } from "./utils.js";

export async function handleLogin() {
  const username = $("#username").value.trim();
  const password = $("#password").value.trim();
  const loginBtn = $("#loginBtn");

  if (!username || !password) {
    alert("Ingresa usuario y contraseña");
    return;
  }

  // UX: Loading state
  const originalText = loginBtn.innerHTML;
  loginBtn.innerHTML = `<i data-feather="loader" class="spin"></i> Verificando...`;
  loginBtn.disabled = true;
  if (window.feather) feather.replace();

  try {
    const user = await api.login(username, password);
    localStorage.setItem("alb_session", JSON.stringify(user));
    window.location.href = "app.html";
  } catch (e) {
    console.error(e);
    alert(e.message || "Credenciales inválidas");
  } finally {
    // Restaurar botón
    loginBtn.innerHTML = originalText;
    loginBtn.disabled = false;
    if (window.feather) feather.replace();
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
