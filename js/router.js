export class Router {
  constructor() {
    this.routes = {};
    window.addEventListener("popstate", () => this.handle());
  }

  add(routeName, page) {
    this.routes[routeName] = page;
  }

  route(event) {
    event = event || window.event;
    event.preventDefault();

    window.history.pushState({}, "", event.target.href);

    this.handle();
  }

  handle() {
    const { pathname } = window.location;
    const route = this.routes[pathname] || this.routes[404];

    fetch(route)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Resposta de rede não foi OK");
        }
        return response.text();
      })
      .then((html) => {
        document.querySelector(".app").innerHTML = html;
      })
      .catch((error) => {
        console.error("Erro no fetch:", error);
        document.querySelector(".app").innerHTML =
          "<h1>Erro ao carregar a página</h1>";
      });
  }
}
