import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
    plugins: [
        laravel({
            input: [
                'resources/css/app.css',
                'resources/js/dashboard.jsx',
                'resources/js/explore.jsx',
                'resources/js/schedule.jsx',
                'resources/js/profile.jsx',
                'resources/js/payment.jsx',
                'resources/js/private-event.jsx',
                'resources/js/private-invite.jsx',
                'resources/js/studio.jsx',
            ],
            refresh: true,
        }),
        tailwindcss(),
    ],
    server: {
        watch: {
            ignored: ['**/storage/framework/views/**'],
        },
    },
});
