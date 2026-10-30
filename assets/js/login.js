import { login } from "./auth.js";
import { cadastrarUsuario } from "./services.js";

const formLogin = document.getElementById("form-login");
const formCadastro = document.getElementById("form-cadastro");
const areaErro = document.getElementById("erro");

formLogin.addEventListener("submit", async (evento) => {
  evento.preventDefault();
  areaErro.textContent = "";
  const email = document.getElementById("email-login");
  const senha = document.getElementById("senha-login");

  try {
    await login(email.value, senha.value);
    formLogin.reset();
    window.location.assign("/index.html");
  } catch (e) {
    areaErro.textContent = e.message;
  }
});

formCadastro.addEventListener("submit", async (evento) => {
  evento.preventDefault();
  areaErro.textContent = "";
  const nome = document.getElementById("nome-cadastro");
  const email = document.getElementById("email-cadastro");
  const senha = document.getElementById("senha-cadastro");

  try {
    await cadastrarUsuario(nome.value, email.value, senha.value);
    location.reload();
  } catch (e) {
    areaErro.textContent = e.message;
  }
});
