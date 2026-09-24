import type { ArticleBlock } from '../../models/article';

export const body: ArticleBlock[] = [
  {
    type: 'paragraph',
    text: 'I was asked to mentor two juniors about a year into my first job, which felt like being asked to teach a subject I was still failing. It turned out to be the most useful thing that happened to my own code that year, and almost none of the benefit came from anything I taught.',
  },
  { type: 'heading', text: 'Explaining a decision out loud is a test' },
  {
    type: 'paragraph',
    text: 'The first time someone asked me why a function was structured the way it was, I started explaining and heard myself run out of reasons about two sentences in. It was not a decision. It was a habit I had inherited and never examined.',
  },
  {
    type: 'quote',
    text: 'You do not find out whether a design choice was deliberate until you have to defend it to someone who has no reason to be polite about it.',
  },
  {
    type: 'paragraph',
    text: 'I started doing this deliberately before writing anything non-obvious. If I could not say out loud why this shape and not the other one, that was usually a sign I had not thought about it yet.',
  },
  { type: 'heading', text: 'Reviewing someone else\'s code is reviewing your own rules' },
  {
    type: 'paragraph',
    text: 'Most of what I said in reviews for the first month was style preference dressed up as principle. I could tell because I could not point to what would actually go wrong if they did it their way. Once I started requiring that of myself, the number of comments dropped sharply and the ones that remained got more useful.',
  },
  {
    type: 'list',
    items: [
      'Say what breaks, not what you would have typed',
      'Separate "this is a bug" from "this is a preference", and mark which one you mean',
      'If the same comment comes up three times, the codebase is telling you to write it down',
    ],
  },
  {
    type: 'paragraph',
    text: 'That third one produced the only documentation we had that anyone actually read, because it was written in response to a real repeated question rather than in advance of an imagined one.',
  },
  { type: 'heading', text: 'The questions I could not answer' },
  {
    type: 'paragraph',
    text: 'A junior asked why our state lived in a service rather than in the component, in a project where it clearly could have gone either way. I gave the answer I had been given, and realized halfway through that I was reciting it. We went and looked together, and the honest answer was that the service held state that outlived the component, which was true for that screen and not for the next one.',
  },
  {
    type: 'paragraph',
    text: 'That was a better afternoon than any amount of reading would have produced, and it happened because someone new had no way of knowing which of our conventions were load-bearing.',
  },
  { type: 'heading', text: 'What I would tell someone about to mentor' },
  {
    type: 'paragraph',
    text: 'Answer questions honestly, including with "I do not know, let us find out". The people you are mentoring will remember the second one far longer, and it is the only answer that leaves both of you with something new.',
  },
];
