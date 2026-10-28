const apiUrl = "http://127.0.0.1:8080";

export function getToken() {
  return localStorage.getItem("token");
}

export function setToken(t) {
  localStorage.setItem("token", t);
}

export function removeToken() {
  localStorage.removeItem("token");
}

export async function call(path, { method, body } = {}) {
  const myHeaders = new Headers();

  if (body !== undefined) {
    myHeaders.append("Content-Type", "application/json");
  }

  if (getToken() !== null) {
    myHeaders.append("Authorization", "Bearer " + getToken());
  }

  let response;

  try {
    response = await fetch(apiUrl + path, {
      method: method,
      headers: myHeaders,
      body: JSON.stringify(body),
    });
  } catch (e) {
    throw new Error("Não foi possível se comunicar com o servidor");
  }

  if (response.status == 401 && getToken() !== null && path !== "/auth/login") {
    removeToken();
    window.alert("Erro 401.\nRedirecionando para a página de login");
    window.location.assign("/pages/login.html");
    return undefined; // Esse return serve para parar a função.
  }

  if (response.status == 204) {
    return null;
  }

  let data;
  
  try {
    data = await response.json();
  } catch (e) {
    data = null;
  }

  if (!response.ok) {
    let message =
      data !== null && data.mensagem !== undefined
        ? data.mensagem
        : `Erro ${response.status}`;
    throw new Error(message);
  }

  return data;
}
