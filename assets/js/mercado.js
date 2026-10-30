import { buscarMercado } from "./services.js";
import { nomeCidade } from "./enumFormatter.js";
import { isLoggedIn, logout } from "./auth.js";

const nome = document.getElementById("nome");
const endereco = document.getElementById("endereco");
const listaProdutos = document.getElementById("produtos");
const novoProduto = document.getElementById("novo-produto");
const mensagem = document.getElementById("mensagem");
const id = new URLSearchParams(location.search).get("id");
const userState = document.getElementById("user-state");

function userStateChangeButton() {
  userState.textContent = isLoggedIn() ? "Sair" : "Entrar";
  userState.hidden = false;
}

userState.addEventListener("click", () => {
  isLoggedIn() ? logout() : location.assign("/pages/login.html");
});

async function load() {
  mensagem.textContent = "";
  if (!id) {
    mensagem.textContent = "Mercado não informado";
    return;
  }

  try {
    const mercado = await buscarMercado(id);
    nome.textContent = mercado.nome;
    endereco.textContent = `${mercado.rua} ${mercado.numero}, ${mercado.bairro}, ${nomeCidade(mercado.cidade)}, ${mercado.cep}`;
    render(mercado.produtos);
    if (isLoggedIn()) {
      novoProduto.href = "/pages/novo-produto.html?mercado=" + id;
      novoProduto.textContent = "Adicionar produto";
      novoProduto.hidden = false;
    }
  } catch (e) {
    mensagem.textContent = e.message;
  }
}

function render(produtos) {
  listaProdutos.replaceChildren();
  if (produtos.length === 0) {
    mensagem.textContent = "Nenhum produto cadastrado";
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

userStateChangeButton();
load();
