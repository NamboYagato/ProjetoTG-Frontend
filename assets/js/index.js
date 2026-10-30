import { listarMercados } from "./services.js";
import { nomeCidade } from "./enumFormatter.js";
import { setupSessionButton } from "./sessionButton.js";

const campoBusca = document.getElementById("nome-mercado");
const listMercados = document.getElementById("lista");
const mensagem = document.getElementById("mensagem");
const userState = document.getElementById("user-state");

async function load(name) {
  mensagem.textContent = "";
  try {
    const mercados = await listarMercados(name);
    render(mercados);
  } catch (e) {
    listMercados.replaceChildren();
    mensagem.textContent = e.message;
  }
}

function render(mercados) {
  listMercados.replaceChildren();
  if (mercados.length === 0) {
    mensagem.textContent = "Nenhum mercado encontrado";
    return;
  }
  mercados.forEach((mercado) => {
    const li = document.createElement("li");
    const a = document.createElement("a");

    a.href = "/pages/mercado.html?id=" + mercado.id;
    a.textContent = mercado.nome;
    const detail = document.createElement("span");
    detail.textContent = ` ${mercado.bairro}, ${nomeCidade(mercado.cidade)}`;
    li.append(a, detail);
    listMercados.append(li);
  });
}

campoBusca.addEventListener("input", () => {
  load(campoBusca.value.trim());
});

setupSessionButton(userState);
load("");
