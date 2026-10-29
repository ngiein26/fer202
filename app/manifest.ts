import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'TechStore - E-Commerce App',
    short_name: 'TechStore',
    description: 'Discover cutting-edge devices and premium tech accessories.',
    start_url: '/',
    display: 'standalone',
    orientation: 'portrait',
    background_color: '#060713',
    theme_color: '#060713',
    icons: [
      { src: '/icon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any' },
      { src: '/icon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'maskable' },
    ],
  };
}
