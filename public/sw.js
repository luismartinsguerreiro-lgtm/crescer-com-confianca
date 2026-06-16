const CACHE_NAME = 'crescer-com-confianca-v2';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png',
  '/icon-192-maskable.png',
  '/icon-512-maskable.png'
];

// Instalação do Service Worker - Pré-carrega recursos principais
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[Service Worker] Pré-carregando a App Shell...');
        return cache.addAll(ASSETS_TO_CACHE);
      })
      .then(() => self.skipWaiting())
  );
});

// Ativação do Service Worker - Limpa caches obsoletos
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('[Service Worker] Eliminando cache antigo:', cache);
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Interceção de pedidos (Fetch)
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Permitir apenas requisições GET normais e ignorar esquemas estranhos (por ex., extensões do Chrome)
  if (event.request.method !== 'GET' || !url.protocol.startsWith('http')) {
    return;
  }

  // Para chamadas de API (como o chatbot Gemini), usamos Network-First
  if (url.pathname.startsWith('/api')) {
    event.respondWith(
      fetch(event.request).catch(() => {
        // Sem ligação, tenta ver se já temos guardado em cache por segurança
        return caches.match(event.request);
      })
    );
    return;
  }

  // Para outros ativos estáticos, usamos Stale-While-Revalidate (Rápido off-line, atualiza em background)
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        // Atualiza a cache silenciosamente em segundo plano, se houver rede
        fetch(event.request)
          .then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              caches.open(CACHE_NAME).then((cache) => {
                cache.put(event.request, networkResponse);
              });
            }
          })
          .catch(() => { /* Silenciar falhas na rede em background */ });
        
        return cachedResponse;
      }

      // Se não estiver na cache, vai buscar à rede e adiciona dinamicamente à cache
      return fetch(event.request).then((networkResponse) => {
        if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
          return networkResponse;
        }

        const responseToCache = networkResponse.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });

        return networkResponse;
      });
    })
  );
});
