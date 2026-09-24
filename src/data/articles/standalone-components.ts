import type { ArticleBlock } from '../../models/article';

export const body: ArticleBlock[] = [
  {
    type: 'paragraph',
    text: 'For two years my folder structure was a direct mirror of the framework. Every feature had a module, the module had a routing module, and the routing module had a component that existed mostly to be routed to. Standalone components deleted the middle of that chain, and it took me a while to work out what should replace it.',
  },
  { type: 'heading', text: 'The structure was the framework, not the feature' },
  {
    type: 'paragraph',
    text: 'The trouble with a module-shaped structure is that it answers a question nobody asks. Nobody opens the project wondering where the NgModules live. They open it wondering where checkout is. My old layout made the second question take three hops to answer.',
  },
  {
    type: 'paragraph',
    text: 'Once a component can declare its own dependencies, the module stops being a unit of organization and the feature becomes one instead.',
  },
  {
    type: 'code',
    language: 'text',
    code: `src/
  features/
    checkout/
      checkout.page.ts
      checkout.routes.ts
      components/
        cart-summary/
        payment-form/
      data/
        checkout.api.ts
        checkout.store.ts
    catalogue/
      catalogue.page.ts
      catalogue.routes.ts
  shared/
    ui/
    utils/`,
  },
  { type: 'heading', text: 'Three rules I settled on' },
  {
    type: 'list',
    ordered: true,
    items: [
      'A feature folder can import from shared, and never from another feature folder.',
      'Anything used by exactly one feature lives in that feature, however generic it looks today.',
      'Shared is the only folder allowed to grow without a clear owner.',
    ],
  },
  {
    type: 'paragraph',
    text: 'The first rule does most of the work. The moment you can see a cross-feature import, you have found either a missing piece of shared or a feature boundary you drew in the wrong place. Both are worth knowing early.',
  },
  {
    type: 'quote',
    text: 'Moving a file out of a feature folder into shared should feel mildly annoying. That friction is the point — it is the cost of a component earning its keep.',
  },
  { type: 'heading', text: 'What I lost' },
  {
    type: 'paragraph',
    text: 'I will be honest that something did get harder. Modules gave me a single file where I could read the whole surface of a feature at a glance, and I have not found a replacement I like as much.',
  },
  {
    type: 'paragraph',
    text: 'The route file is the closest thing. Since routes now carry the lazy loading boundary, reading a feature\'s routes tells you what the feature exposes to the rest of the app, which is most of what I used to get from the module file.',
  },
  { type: 'heading', text: 'Would I go back' },
  {
    type: 'paragraph',
    text: 'No, but mainly for a reason that has nothing to do with the technical merits. The new structure lets someone who has never seen the project find the code for a screen in one hop. That is worth more to a team than any of the boilerplate we deleted.',
  },
];
