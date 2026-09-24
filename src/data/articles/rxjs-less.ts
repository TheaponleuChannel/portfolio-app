import type { ArticleBlock } from '../../models/article';

export const body: ArticleBlock[] = [
  {
    type: 'paragraph',
    text: 'For a long time RxJS was the part of Angular I understood least and used most. I could copy an operator chain from a colleague and make it work, but I could not have told you why it worked or what it would do under load. Getting comfortable with it turned out to be less about learning operators and more about learning when not to use them.',
  },
  { type: 'heading', text: 'What actually made it click' },
  {
    type: 'paragraph',
    text: 'The mental model that finally landed was embarrassingly simple: an observable is a function that takes a callback and returns a way to cancel. Everything else is composition built on that. Once I could picture the subscribe function underneath, switchMap stopped being magic.',
  },
  {
    type: 'code',
    language: 'ts',
    code: `// An observable is roughly this, with types and operators on top
function interval(ms: number) {
  return (observer: Observer<number>) => {
    let n = 0;
    const id = setInterval(() => observer.next(n++), ms);
    return () => clearInterval(id);
  };
}`,
  },
  {
    type: 'paragraph',
    text: 'The other half was understanding that operators are just functions that take an observable and return an observable. There is no framework magic in between. That is why you can write your own, and why the ones you write are indistinguishable from the built-in ones.',
  },
  { type: 'heading', text: 'switchMap was the one that mattered' },
  {
    type: 'paragraph',
    text: 'Almost every real bug I hit with RxJS was a cancellation bug, and switchMap is the operator that solves them. Type in a search box fast enough and you get three requests back in whatever order the network decides. switchMap cancels the previous one so only the latest can win.',
  },
  {
    type: 'list',
    items: [
      'switchMap — cancel the previous, keep the latest. Search, navigation, anything where only the newest answer matters.',
      'concatMap — queue them, preserve order. Writes where sequence is the point.',
      'mergeMap — run them all concurrently. When you genuinely want every one and do not care about order.',
      'exhaustMap — ignore new ones while busy. Submit buttons that must not double-fire.',
    ],
  },
  {
    type: 'quote',
    text: 'Choosing between the flattening operators is not a style question. It is the answer to "what should happen if a second one arrives while the first is still running", and that question has a correct answer every time.',
  },
  { type: 'heading', text: 'Then I started using less of it' },
  {
    type: 'paragraph',
    text: 'The more comfortable I got, the fewer places I reached for it. A lot of the observables I had written were carrying a single value from one place to another, and a promise or a plain value would have done the job with far less to reason about.',
  },
  { type: 'heading', text: 'Where it earns its place' },
  {
    type: 'list',
    items: [
      'Anything debounced or throttled, where the timing is the feature',
      'Retry with backoff, which is tedious to write correctly by hand',
      'Combining several live sources that each update independently',
      'Anything that needs to be cancelled, which is most things a user can navigate away from',
    ],
  },
  {
    type: 'paragraph',
    text: 'My advice to the version of me from two years ago would be to learn switchMap, takeUntil and the difference between the four flattening operators, and then be suspicious of every other operator until a problem actually demands it.',
  },
];
