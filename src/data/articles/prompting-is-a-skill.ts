import type { ArticleBlock } from '../../models/article';

export const body: ArticleBlock[] = [
  {
    type: 'paragraph',
    text: 'I use language models every day now, and I am more worried about them than I was a year ago — not because they got worse, but because they got good enough that it became easy to stop thinking. Most of what I have figured out since is about keeping the model as a tool rather than an oracle.',
  },
  { type: 'heading', text: 'The failure mode is subtle' },
  {
    type: 'paragraph',
    text: 'Nobody hands in code they do not understand on purpose. What happens is smaller than that. You ask for a fix, it looks right, it works, and you move on without ever forming the opinion you would have formed if you had written it yourself. Do that twenty times and you have shipped a lot of code you cannot explain.',
  },
  {
    type: 'quote',
    text: 'The danger is not that the model is wrong. It is that it is right often enough that you stop checking, and then one day it is wrong in a way you no longer have the habit to catch.',
  },
  { type: 'heading', text: 'What I actually changed' },
  {
    type: 'paragraph',
    text: 'The single most useful rule I adopted: I do not accept code I could not have written. That does not mean writing everything myself. It means if the model produces something unfamiliar, I stop and make myself understand it before it goes anywhere.',
  },
  {
    type: 'list',
    items: [
      'Ask for the reasoning before the code, then decide whether the reasoning holds',
      'Explain the problem fully — vague prompts produce code that is plausible and wrong',
      'Use it to review my own code rather than to replace it, which is where it is strongest',
      'Never paste the answer without being able to say what it does line by line',
    ],
  },
  { type: 'heading', text: 'Where it is genuinely excellent' },
  {
    type: 'paragraph',
    text: 'Being stuck on something and having something to push back against is worth a great deal. A model that will read my function and tell me three ways it could break is doing the job a patient colleague does, and it is available at the moment I need it instead of at the next standup.',
  },
  {
    type: 'paragraph',
    text: 'It is also very good at the tasks I was never going to enjoy: converting a shape from one format to another, writing the test I could not be bothered to write, explaining what an unfamiliar error actually means so I can go read the real source.',
  },
  { type: 'heading', text: 'The prompt is not the interesting part' },
  {
    type: 'paragraph',
    text: 'I spent a while collecting techniques — role prompts, step-by-step instructions, elaborate formatting rules. Most of them bought me less than simply describing the problem precisely, including the constraints, and saying what I had already tried and why it did not work.',
  },
  {
    type: 'paragraph',
    text: 'Which is the same thing that makes a good bug report, and a good question to a colleague. The skill being tested turns out to be the one I have been practising the whole time: knowing what I actually want and being able to say it clearly.',
  },
  { type: 'heading', text: 'Where I draw the line' },
  {
    type: 'paragraph',
    text: 'I do not use it to decide what to build, to write the parts I am supposed to be learning, or to produce text that goes out under my name without me rewriting it. The first two are the job. The third is just dishonest, and it is also obvious to anyone reading carefully.',
  },
];
