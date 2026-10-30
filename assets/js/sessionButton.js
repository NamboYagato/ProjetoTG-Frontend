import { isLoggedIn, logout } from "./auth.js";

export function setupSessionButton(button) {
  button.textContent = isLoggedIn() ? "Sair" : "Entrar";
  button.hidden = false;
  button.addEventListener("click", () => {
    isLoggedIn() ? logout() : location.assign("/pages/login.html");
  });
}
