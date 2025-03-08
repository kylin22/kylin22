import LocomotiveScroll from 'locomotive-scroll'
import 'locomotive-scroll/dist/locomotive-scroll.css'
import type { InstanceOptions } from 'locomotive-scroll'

let scroll: LocomotiveScroll;

export default defineNuxtPlugin({
  name: 'locomotive-scroll',
  setup(nuxtApp) {
    nuxtApp.vueApp.directive<HTMLElement, InstanceOptions>('locomotive', {
      mounted(el, binding) {
        const locomotiveScroll = new LocomotiveScroll({
          el: el,
          smooth: true,
          ...binding.value,
        });

        scroll = locomotiveScroll;

        el.locomotive = locomotiveScroll;
      },
      beforeUnmount(el) {
        el.locomotive!.destroy();
        el.locomotive = undefined;
      },
    })
  },
});

export { scroll };

declare global {
  interface HTMLElement {
    locomotive?: LocomotiveScroll
  }
}

declare module '@vue/runtime-core' {
  interface GlobalDirective {
    locomotive: Directive<HTMLElement, InstanceOptions>
  }
}