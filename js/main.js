import { render } from "./views.js";
import { $, $$ } from "./utils.js";
import { logout } from "./auth.js";

const session = JSON.parse(localStorage.getItem("alb_session") || "{}");
if (!session?.role) {
  window.location.href = "login.html";
}

console.log("Session data:", session);

function updateChip() {
  const chip = $("#chipUser");
  if (chip && session.role) {
    chip.textContent = session.role;
    console.log("Chip actualizado con rol:", session.role, "name:", session.name);
  } else {
    console.log("Chip no encontrado o rol incompleto:", { chip: !!chip, role: session.role });
  }
}

window.addEventListener("DOMContentLoaded", () => {
  updateChip();

  $$(".nav__btn").forEach(btn => {
    btn.addEventListener("click", () => {
      $$(".nav__btn").forEach(b => b.removeAttribute("aria-current"));
      btn.setAttribute("aria-current", "page");
      render(btn.dataset.view);
    });
  });

  $("#logoutBtn")?.addEventListener("click", logout);

  render("dashboard");
  feather.replace();
});
