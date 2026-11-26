import { detalheProduto } from "./services.js";
import { setupSessionButton, setupBackButton } from "./header.js";

const userState = document.getElementById("user-state");
const backButton = document.getElementById("back-button");
const nome = document.getElementById("produto");
const valor = document.getElementById("valor");
const dono = document.getElementById("dono");
const mercado = document.getElementById("mercado");
const mensagem = document.getElementById("mensagem");
const idProduto = new URLSearchParams(window.location.search).get("id");

async function load() {
  mensagem.textContent = "";
  if (!idProduto) {
    mensagem.textContent = "Produto não encontrado";
    return;
  }
  try {
    const produto = await detalheProduto(idProduto);
    nome.textContent = produto.nome;
    if (produto.valor != null) {
      valor.textContent = produto.valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
    } else {
      valor.textContent = "Valor indisponível!";
    }
    mercado.textContent = produto.mercado.nome;
    dono.textContent = produto.usuario.nome;
  } catch (e) {
    mensagem.textContent = e.message;
  }
}

setupBackButton(backButton, "/index.html");
setupSessionButton(userState);
load();
