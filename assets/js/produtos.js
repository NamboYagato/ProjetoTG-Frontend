import { buscarProdutos } from "./services.js";
import { setupSessionButton } from "./header.js";

const userState = document.getElementById("user-state");
const listaProdutos = document.getElementById("produtos");
const mensagem = document.getElementById("mensagem");
const nomeProduto = new URLSearchParams(window.location.search).get("name");

async function load() {
  mensagem.textContent = "";
  try {
    const produtos = await buscarProdutos(nomeProduto);
    render(produtos);
  } catch (e) {
    mensagem.textContent = e.message;
  }
}

function render(produtos) {
  listaProdutos.replaceChildren();
  if (produtos.length === 0) {
    mensagem.textContent = "Nenhum produto encontrado";
    return;
  }
  produtos.forEach((produto) => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = "/pages/produto.html?id=" + produto.id;
    a.textContent = `${produto.nome} ${produto.valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}`;
    li.append(a);
    listaProdutos.append(li);
  });
}

setupSessionButton(userState);
load();
