export default function manifest() {
    return {
        name: 'Gratis Loopbaantest',
        short_name: 'Jouw Loopbaantest',
        description: 'Vragen over je job en loopbaan? Doe de test en bekijk meteen het resultaat. Het geeft inzicht in de knelpunten. En is het begin van een oplossing.',
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