import { login } from "./auth.js";

const formLogin = document.getElementById("form_login");
const areaErro = document.getElementById("erro");

formLogin.addEventListener("submit", async (evento) => {
  evento.preventDefault();
  areaErro.textContent = "";
  const email = document.getElementById("email_login");
  const senha = document.getElementById("senha_login");

  try {
    await login(email.value, senha.value);
    formLogin.reset();
    window.location.assign("/index.html");
  } catch (e) {
    areaErro.textContent = e.message;
  }
});