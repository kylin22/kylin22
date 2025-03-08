// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },
  modules: [],
  tres: {
    glsl: true,
  },
  ssr: false,
  plugins: ['~/plugins/locomotive.ts'],
})
