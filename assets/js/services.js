import { call } from "./api.js";

export async function cadastrarUsuario(nome, email, password) {
  await call("/usuarios", {
    method: "POST",
    body: { nome: nome, email: email, senha: password },
  });
}
