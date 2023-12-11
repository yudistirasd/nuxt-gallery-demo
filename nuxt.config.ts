import { defineNuxtConfig } from "nuxt/config";
import { imagetools } from "vite-imagetools";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    srcDir: "src",
    alias: {
        "@/": "/src/",
    },
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },
    vite: {
        build: {
            target: "esnext",
        },
        resolve: {
            alias: {
                "@/*": "src/*",
            },
        },
        plugins: [imagetools()],
    },
    modules: ["@nuxtjs/tailwindcss", "@nuxt/image-edge", "vite-plugin-vue-type-imports/nuxt", "@kevinmarrec/nuxt-pwa"],
    image: {
        //supported providers are currently either vercel or ipx
        provider: "vercel",
        dir: "../images",
        screens: {
            xxxs: 10,
            xxs: 240,
            xs: 320,
            sm: 640,
            md: 768,
            lg: 1024,
            xl: 1280,
            "2xl": 1536,
        },
    },
    pwa: {
        workbox: {
            //set to false if PWA functionality is unwanted
            enabled: process.env.NODE_ENV !== "development",
        },
    },
    app: {
        layoutTransition: {
            name: "layout",
            mode: "out-in",
            duration: 350,
        },
    },
    tailwindcss: {
        cssPath: "@/assets/css/tailwind.css",
    },
});
