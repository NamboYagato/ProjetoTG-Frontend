const cidades = {
  CACAPAVA: "Caçapava",
  SAO_JOSE_DOS_CAMPOS: "São José dos Campos",
  TAUBATE: "Taubaté",
};

export function nomeCidade(cidade) {
  return cidades[cidade] || cidade;
}
