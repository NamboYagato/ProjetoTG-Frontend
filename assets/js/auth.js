import { call, setToken, removeToken, getToken } from "./api.js";

export async function login(email, password) {
    const data = await call("/auth/login", { method: "POST", body: { email: email, senha: password } });
    setToken(data.token);
}

export function logout() {
    removeToken();
    window.location.replace("/pages/login.html");
}

export function isLoggedIn() {
    return getToken() !== null;
}