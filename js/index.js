import { Router } from "./router.js";

// Cria uma nova instância do roteador
const router = new Router();

// Adiciona rotas e seus respectivos arquivos HTML
router.add("/", "/pages/home.html");
router.add("/about", "/pages/about.html");
router.add("/contact", "/pages/contact.html");
router.add(404, "/pages/404.html");

// Inicializa a renderização da página atual
router.handle();

// Adiciona um ouvinte para o evento de navegação de histórico
window.addEventListener("popstate", () => router.handle());

// Define uma função global para navegação programática
window.route = (event) => router.route(event);
