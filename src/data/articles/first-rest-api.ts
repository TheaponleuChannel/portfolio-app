import type { ArticleBlock } from '../../models/article';

export const body: ArticleBlock[] = [
  {
    type: 'paragraph',
    text: 'I came to the backend late, and from the frontend, which meant I had a lot of confident opinions about APIs and no experience building one. This is what my first real REST service looked like, and more usefully, what I got wrong in it.',
  },
  { type: 'heading', text: 'The part that was easier than expected' },
  {
    type: 'paragraph',
    text: 'Routing and request handling came quickly. An Express route is a function that receives a request and sends a response, and once that clicked the rest was mostly remembering to await things. Coming from the frontend, the surprising part was how little framework there is. I spent the first day waiting for the other shoe to drop.',
  },
  {
    type: 'code',
    language: 'js',
    code: `router.get('/posts/:id', async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Not found' });
    res.json(post);
  } catch (err) {
    next(err);
  }
});`,
  },
  { type: 'heading', text: 'Mistake one: no validation at the edge' },
  {
    type: 'paragraph',
    text: 'I wrote handlers that trusted the request body because the frontend I had written only sent the right shape. That held until the day I tested the endpoint from a terminal and got an unhandled cast error instead of a useful response.',
  },
  {
    type: 'paragraph',
    text: 'The fix was to validate before touching the database and return a 400 with something a client could act on. The rule I took from it: the request body is user input, no matter how much you trust the client that sent it.',
  },
  { type: 'heading', text: 'Mistake two: treating the database as a function call' },
  {
    type: 'paragraph',
    text: 'My first version fetched documents in a loop, one await at a time. With ten records it was instant. With a few hundred it was visibly slow, and I did not understand why until someone pointed out that I had written an N+1 query.',
  },
  {
    type: 'code',
    language: 'js',
    code: `// What I wrote
for (const id of ids) {
  posts.push(await Post.findById(id));
}

// What I should have written
const posts = await Post.find({ _id: { $in: ids } });`,
  },
  {
    type: 'quote',
    text: 'A database call inside a loop is almost never what you meant. It just happens to be the thing that works on your test data.',
  },
  { type: 'heading', text: 'Mistake three: error handling as an afterthought' },
  {
    type: 'paragraph',
    text: 'I wrote the happy paths first and left errors for later, which meant the API leaked stack traces and returned 500 for things that were plainly the caller\'s fault. Errors are part of the interface, and they need designing at the same time as the success case.',
  },
  {
    type: 'list',
    items: [
      '400 for input the caller got wrong, with a message that says what was wrong',
      '401 and 403 for the two different flavors of "you cannot do this"',
      '404 only when the resource genuinely does not exist',
      '500 for things you did not anticipate, and logged somewhere you will see',
    ],
  },
  { type: 'heading', text: 'What I would do differently' },
  {
    type: 'paragraph',
    text: 'I would write the error shape first and the success shape second. Every client I have written since has been easier to build against an API that made its failures explicit, and the one I built first taught me that the expensive way.',
  },
];
