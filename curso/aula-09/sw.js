// Service Worker para cache e funcionalidades offline
const CACHE_NAME = "webapis-demo-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/codigo-webapis.js",
  "/worker.js",
  "https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css",
  "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css",
  "https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js",
];

// Evento de instalação do Service Worker
self.addEventListener("install", (event) => {
  console.log("Service Worker: Instalando...");

  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        console.log("Service Worker: Cache aberto");
        return cache.addAll(urlsToCache);
      })
      .catch((error) => {
        console.error("Service Worker: Erro ao abrir cache:", error);
      })
  );
});

// Evento de ativação do Service Worker
self.addEventListener("activate", (event) => {
  console.log("Service Worker: Ativando...");

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          // Remove caches antigos
          if (cacheName !== CACHE_NAME) {
            console.log("Service Worker: Removendo cache antigo:", cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Interceptação de requisições
self.addEventListener("fetch", (event) => {
  // Só intercepta requisições GET
  if (event.request.method !== "GET") {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((response) => {
      // Retorna do cache se encontrado
      if (response) {
        console.log("Service Worker: Servindo do cache:", event.request.url);
        return response;
      }

      // Caso contrário, busca na rede
      console.log("Service Worker: Buscando na rede:", event.request.url);
      return fetch(event.request)
        .then((response) => {
          // Verifica se a resposta é válida
          if (
            !response ||
            response.status !== 200 ||
            response.type !== "basic"
          ) {
            return response;
          }

          // Clona a resposta porque ela pode ser consumida apenas uma vez
          const responseToCache = response.clone();

          // Adiciona ao cache
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });

          return response;
        })
        .catch((error) => {
          console.error("Service Worker: Erro na rede:", error);

          // Retorna uma resposta padrão para páginas HTML
          if (event.request.headers.get("accept").includes("text/html")) {
            return new Response(
              `
                                <html>
                                    <body>
                                        <h1>Modo Offline</h1>
                                        <p>Você está offline. Esta página não está disponível no cache.</p>
                                        <p>URL solicitada: ${event.request.url}</p>
                                    </body>
                                </html>
                            `,
              {
                headers: { "Content-Type": "text/html" },
              }
            );
          }

          // Para outros recursos, retorna erro
          throw error;
        });
    })
  );
});

// Evento de sincronização em background
self.addEventListener("sync", (event) => {
  if (event.tag === "background-sync") {
    console.log("Service Worker: Executando sincronização em background");
    event.waitUntil(doBackgroundSync());
  }
});

// Evento de notificação push
self.addEventListener("push", (event) => {
  const options = {
    body: event.data ? event.data.text() : "Notificação push recebida!",
    icon: "/icon-192x192.png",
    badge: "/badge-72x72.png",
    tag: "push-notification",
    data: {
      url: "/",
    },
  };

  event.waitUntil(self.registration.showNotification("Web APIs Demo", options));
});

// Evento de clique na notificação
self.addEventListener("notificationclick", (event) => {
  console.log("Service Worker: Notificação clicada");

  event.notification.close();

  // Abre ou foca na janela da aplicação
  event.waitUntil(
    clients
      .matchAll({
        type: "window",
      })
      .then((clientList) => {
        for (let client of clientList) {
          if (client.url === "/" && "focus" in client) {
            return client.focus();
          }
        }

        if (clients.openWindow) {
          return clients.openWindow("/");
        }
      })
  );
});

// Função para sincronização em background
async function doBackgroundSync() {
  try {
    // Simula sincronização de dados
    console.log("Service Worker: Sincronizando dados em background...");

    // Aqui você poderia:
    // - Enviar dados pendentes para o servidor
    // - Atualizar cache com novos dados
    // - Realizar tarefas de manutenção

    const response = await fetch("/api/sync", {
      method: "POST",
      body: JSON.stringify({ timestamp: Date.now() }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      console.log("Service Worker: Sincronização concluída com sucesso");
    } else {
      throw new Error("Falha na sincronização");
    }
  } catch (error) {
    console.error("Service Worker: Erro na sincronização:", error);
    throw error;
  }
}

// Mensagens do cliente
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});
