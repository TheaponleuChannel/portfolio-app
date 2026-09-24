import type { ArticleBlock } from '../../models/article';

export const body: ArticleBlock[] = [
  {
    type: 'paragraph',
    text: "For most of my first year writing Angular, my answer to 'this component needs state' was a BehaviorSubject. Not because I had weighed the options, but because that is what the codebase did and what every tutorial I read reached for. Signals made me go back and ask whether that was ever the right call.",
  },
  { type: 'heading', text: 'The reflex I had to break' },
  {
    type: 'paragraph',
    text: 'A BehaviorSubject is a stream with a current value bolted on. If all you ever want is the current value, you are paying for the stream: a subscription to create, a subscription to tear down, and an async pipe in the template to avoid leaking it. A signal is just the value.',
  },
  {
    type: 'list',
    items: [
      'A value the template reads directly, with no subscription to manage',
      'A derived value that recomputes only when its inputs actually change',
      'State a service can expose as read-only without handing out a way to write it',
    ],
  },
  {
    type: 'paragraph',
    text: 'That third one was the surprise. I used to expose a public observable and keep the subject private just to make a service read-only from the outside. With signals it is genuinely one line:',
  },
  {
    type: 'code',
    language: 'ts',
    code: `private readonly _items = signal<Item[]>([]);
readonly items = this._items.asReadonly();

add(item: Item) {
  this._items.update(current => [...current, item]);
}`,
  },
  { type: 'heading', text: 'Computed is where it actually pays off' },
  {
    type: 'paragraph',
    text: 'The win is not the signal itself, it is computed. A getter that filters and sorts a list runs on every change detection cycle. A computed runs when its dependencies change, and Angular knows exactly which ones those are.',
  },
  {
    type: 'paragraph',
    text: 'I had a table where the filtered rows were recalculated on every keystroke in a completely unrelated search box. Rewriting it as a chain of two computeds cut the work down to only what the filter actually touched.',
  },
  {
    type: 'quote',
    text: 'If you can describe a value as a function of other values, it should be a computed — not a field you have to remember to update.',
  },
  {
    type: 'paragraph',
    text: 'The discipline that forced on me was worth more than the performance it bought. Half the bugs I used to write were "I updated A but forgot to update B", and a computed makes that bug impossible to express in the first place.',
  },
  { type: 'heading', text: 'Where I still reach for RxJS' },
  {
    type: 'paragraph',
    text: 'Signals are values. They are not a replacement for streams, and trying to make them one is where I watch people get into trouble. I still use observables for anything where "when" matters more than "what":',
  },
  {
    type: 'list',
    items: [
      'HTTP calls, and anything with cancellation semantics',
      'Event streams over time — debounced input, websocket messages, retry with backoff',
      'Composition of things that have not happened yet',
    ],
  },
  {
    type: 'paragraph',
    text: 'The short version I keep coming back to: if the question is "what is the current value", reach for a signal. If the question is "what happened, in what order, and what should we do about it", that is still RxJS. Interop between the two is good enough now that the boundary is not painful.',
  },
  { type: 'heading', text: 'What I would tell someone starting today' },
  {
    type: 'paragraph',
    text: 'Do not rewrite everything. Pick one component that holds a BehaviorSubject whose only consumer is its own template, and convert just that one. The diff will be smaller than you expect, and it will be obvious whether the trade suits you before you touch anything that actually matters.',
  },
];
