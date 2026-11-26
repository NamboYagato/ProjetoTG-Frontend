import { call } from "./api.js";

export async function cadastrarUsuario(nome, email, password) {
  await call("/usuarios", {
    method: "POST",
    body: { nome: nome, email: email, senha: password },
  });
}

export function listarMercados(nomeMercado) {
  const pathMercadosSearch = nomeMercado
    ? "/mercados?name=" + encodeURIComponent(nomeMercado)
    : "/mercados";
  return call(pathMercadosSearch);
}

export function buscarMercado(id) {
  return call("/mercados/" + id);
}

export function buscarProdutos(nomeProduto) {
  const pathProdutosSearch = nomeProduto
    ? "/produtos?name=" + encodeURIComponent(nomeProduto)
    : "/produtos";
  return call(pathProdutosSearch);
}

export function detalheProduto(id) {
  return call("/produtos/" + id);
}
