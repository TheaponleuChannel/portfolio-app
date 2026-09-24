import type { ArticleBlock } from '../../models/article';

export const body: ArticleBlock[] = [
  {
    type: 'paragraph',
    text: 'Composables are the whole point of the Composition API, but the ones that age well follow a shape. I have written enough of them now to notice which decisions I keep making the same way, and which ones I got wrong the first several times.',
  },
  { type: 'heading', text: 'One composable, one concern' },
  {
    type: 'paragraph',
    text: 'The failure mode I keep hitting is a composable that started as useThing and slowly became useEverything. It fetches, it filters, it holds UI state, and it has a ref for whether the sidebar is open. If describing it needs the word "and", it is two composables.',
  },
  {
    type: 'paragraph',
    text: 'The test I use: can I write the return statement from memory a week later? If not, it is doing too much for one name to carry.',
  },
  { type: 'heading', text: 'Return an object, not an array' },
  {
    type: 'list',
    items: [
      'Named properties survive being added to, so a new return value is not a breaking change',
      'The call site reads better — const { loading, error } = useThing()',
      'Order stops mattering, which matters a lot more once there are six values',
    ],
  },
  {
    type: 'paragraph',
    text: 'The exception is when the order genuinely carries meaning, which is rare. A tuple works when there are exactly two values and one is obviously the setter.',
  },
  { type: 'heading', text: 'Accept refs, return refs' },
  {
    type: 'paragraph',
    text: 'A composable that takes a plain value takes a snapshot. A composable that takes a ref stays live. I learned this the hard way when a search composable kept filtering against the initial query because the caller passed searchText.value instead of searchText.',
  },
  {
    type: 'code',
    language: 'ts',
    code: `export function useFilteredList<T>(
  source: Ref<T[]>,
  query: Ref<string>,
) {
  return computed(() => {
    const q = query.value.trim().toLowerCase();
    if (!q) return source.value;
    return source.value.filter(item =>
      JSON.stringify(item).toLowerCase().includes(q),
    );
  });
}`,
  },
  {
    type: 'paragraph',
    text: 'The signature documents the contract. Ref in, ref out means "this stays in sync with whatever you give me", and that promise is visible at the call site rather than buried in the implementation.',
  },
  { type: 'heading', text: 'Clean up in the composable, not the component' },
  {
    type: 'paragraph',
    text: 'If a composable adds a window listener, the composable should remove it. Making every caller remember to call a dispose function is a bug waiting to happen, and the first caller who forgets will be the one who cannot reproduce it.',
  },
  {
    type: 'quote',
    text: 'A composable that requires its caller to do cleanup has quietly moved a lifecycle concern across a boundary where nobody will look for it.',
  },
  {
    type: 'paragraph',
    text: 'None of this is exotic. It is closer to house style than architecture. But these four decisions account for most of the composables I have had to go back and rewrite.',
  },
];
