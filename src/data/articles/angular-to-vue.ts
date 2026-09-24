import type { ArticleBlock } from '../../models/article';

export const body: ArticleBlock[] = [
  {
    type: 'paragraph',
    text: 'I spent most of two years in Angular before I wrote anything serious in Vue. I assumed the move would be mostly mechanical — different template syntax, different reactivity library, same ideas underneath. It was not. Some of my instincts were not just unhelpful, they were actively wrong.',
  },
  { type: 'heading', text: 'The dependency injection habit' },
  {
    type: 'paragraph',
    text: 'Angular teaches you to reach for a service the moment a component needs to share anything. It is a good habit there because the injector is the natural place for that. In Vue I wrote provider files that existed only to wrap a ref and hand it back, which is a lot of ceremony around what is often just a module-level ref.',
  },
  {
    type: 'paragraph',
    text: 'The thing that clicked for me was realizing a composable is not a service. It is a function that happens to return reactive state. It does not need registering, it does not have a lifecycle, and it does not want to be a singleton unless you specifically make it one.',
  },
  {
    type: 'code',
    language: 'ts',
    code: `// Module scope: one shared instance
const count = ref(0);
export function useCounter() {
  return { count, increment: () => count.value++ };
}

// Function scope: fresh instance per call
export function useCounter() {
  const count = ref(0);
  return { count, increment: () => count.value++ };
}`,
  },
  {
    type: 'paragraph',
    text: 'Where that ref sits is the whole design decision, and it is invisible unless you go looking for it. That is a very different feeling from reading a provider declaration.',
  },
  { type: 'heading', text: 'Reactivity does not work the way I expected' },
  {
    type: 'paragraph',
    text: 'The one that actually cost me time: destructuring a reactive object breaks the reactivity, because you have taken the value out of the proxy. Angular would never have let me make this mistake, because there was no proxy to destructure.',
  },
  {
    type: 'quote',
    text: 'I spent an afternoon convinced a component was broken, when the bug was one line of destructuring at the top of the script block.',
  },
  {
    type: 'paragraph',
    text: 'Learning when to use ref, when reactive, and when the answer is neither took longer than the template syntax ever did. My rule now is ref by default, because a ref survives destructuring, being passed into a function, and being returned from one.',
  },
  { type: 'heading', text: 'What transferred cleanly' },
  {
    type: 'list',
    items: [
      'Typing the boundary between components, which is most of what years in a strict framework teaches you',
      'Thinking in components and props rather than in DOM manipulation',
      'Splitting a screen until each piece has one reason to change',
    ],
  },
  {
    type: 'paragraph',
    text: 'The honest summary is that the transferable part was the design instinct, and the part I had to rebuild from scratch was everything about how state actually moves. That is a bigger fraction than I expected going in.',
  },
];
