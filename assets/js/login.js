import { login } from "./auth.js";
import { cadastrarUsuario } from "./services.js";

const formLogin = document.getElementById("form_login");
const formCadastro = document.getElementById("form_cadastro");
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

formCadastro.addEventListener("submit", async (evento) => {
  evento.preventDefault();
  areaErro.textContent = "";
  const nome = document.getElementById("nome_cadastro");
  const email = document.getElementById("email_cadastro");
  const senha = document.getElementById("senha_cadastro");

  try {
    await cadastrarUsuario(nome.value, email.value, senha.value);
    window.alert("Cadastro realizado");
    location.reload();
  } catch (e) {
    areaErro.textContent = e.message;
  }
});