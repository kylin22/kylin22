// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@tresjs/nuxt', function () {
    console.log('Module @tresjs/nuxt is loaded');
  }
  ],
  tres: {
    glsl: true,
  },
})