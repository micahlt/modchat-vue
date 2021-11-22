import {
  registerRoute
} from 'workbox-routing';
import {
  StaleWhileRevalidate
} from 'workbox-strategies';
import {
  ExpirationPlugin
} from 'workbox-expiration';
import {
  precacheAndRoute
} from 'workbox-precaching';

precacheAndRoute(self.serviceWorkerOption.assets);

registerRoute(
  /\.(?:png|gif|jpg|jpeg|svg)$/,
  new StaleWhileRevalidate({
    cacheName: 'images',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
      }),
    ],
  })
);