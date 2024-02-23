export default function manifest() {
    return {
        name: 'Gratis Loopbaantest',
        short_name: 'Jouw Loopbaantest',
        description: 'Vragen over je job en loopbaan? Doe de loopbaantest en bekijk meteen het resultaat en de knelpunten. Zet een nieuwe stap in je carrière.',
        start_url: '/',
        display: 'standalone',
        background_color: '#1c7eb4',
        theme_color: '#daebe8',
        scope: '/',
        icons: [
            {
                src: '/icon.png',
                sizes: 'any',
                type: 'image/png',
            },
            {
                src: '/android-chrome-192x192.png',
                sizes: '192x192',
                type: 'image/png',
            },
            {
                src: "/android-chrome-512x512.png",
                sizes: "512x512",
                type: "image/png"
            },
            {
                src: '/apple-icon.png',
                sizes: 'any',
                type: 'image/png',
            },
            {
                src: '/apple-touch-icon.png',
                sizes: 'any',
                type: 'image/png',
            },
        ],
    }
}