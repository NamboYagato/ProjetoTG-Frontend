import { isLoggedIn, logout } from "./auth.js";

export function setupSessionButton(button) {
  button.textContent = isLoggedIn() ? "Sair" : "Entrar";
  button.hidden = false;
  button.addEventListener("click", () => {
    isLoggedIn() ? logout() : location.assign("/pages/login.html");
  });
}

export function setupBackButton(button, defaultPath) {
  button.addEventListener("click", () => {
    if (document.referrer) {
      const origemReferrer = new URL(document.referrer).origin;
      if (origemReferrer === location.origin) {
        history.back();
        return;
      }
    }
    location.assign(defaultPath);
  });
}
