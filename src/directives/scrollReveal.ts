import type { Directive, DirectiveBinding } from 'vue'

interface ScrollRevealOptions {
  enterClass: string
  threshold?: number
}

const HIDDEN_CLASSES = [
  'scroll-hidden',
  'scroll-hidden-left',
  'scroll-hidden-right',
  'scroll-hidden-zoom',
  'scroll-hidden-scale'
]

/**
 * Custom scroll-reveal directive that permanently reveals elements
 * when they enter the viewport. Unlike PrimeVue's AnimateOnScroll,
 * this does NOT remove the animation class when the element leaves,
 * so content stays visible after being revealed.
 */
function setupObserver(el: HTMLElement, binding: DirectiveBinding<ScrollRevealOptions>) {
  const { enterClass, threshold = 0.15 } = binding.value

  // Skip if already revealed
  if (el.dataset.scrollRevealed === 'true') return

  // Clean up any previous observer
  if ((el as any).__scrollRevealObserver) {
    ;(el as any).__scrollRevealObserver.disconnect()
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Add the animation class
          el.classList.add(enterClass)

          // Mark as revealed
          el.dataset.scrollRevealed = 'true'

          // After animation ends, remove the scroll-hidden base class
          // so the element stays visible permanently
          el.addEventListener(
            'animationend',
            () => {
              HIDDEN_CLASSES.forEach((cls) => el.classList.remove(cls))
            },
            { once: true }
          )

          // Stop observing — one-time reveal only
          observer.unobserve(el)
          delete (el as any).__scrollRevealObserver
        }
      })
    },
    { threshold }
  )

  ;(el as any).__scrollRevealObserver = observer
  observer.observe(el)
}

const scrollReveal: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding<ScrollRevealOptions>) {
    setupObserver(el, binding)
  },
  updated(el: HTMLElement, binding: DirectiveBinding<ScrollRevealOptions>) {
    // Re-setup if the element was re-used by Vue (e.g. in v-for with filtering)
    if (el.dataset.scrollRevealed !== 'true') {
      setupObserver(el, binding)
    }
  },
  beforeUnmount(el: HTMLElement) {
    if ((el as any).__scrollRevealObserver) {
      ;(el as any).__scrollRevealObserver.disconnect()
      delete (el as any).__scrollRevealObserver
    }
  }
}

export default scrollReveal
