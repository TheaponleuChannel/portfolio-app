import type { ArticleBlock } from '../../models/article';

export const body: ArticleBlock[] = [
  {
    type: 'paragraph',
    text: 'Most developer portfolios look the same, and I say that as someone who built one of the identical ones first. Skill bars, a grid of cards, a hero that says passionate about technology. The problem is not the taste — it is that the page is designed to be impressive rather than to be read.',
  },
  { type: 'heading', text: 'The skill bar is a lie you tell in public' },
  {
    type: 'paragraph',
    text: 'A bar that says JavaScript at 85 percent tells a reader nothing except that you were willing to guess. It also invites the one question you cannot answer: 85 percent of what? I removed mine and replaced it with the projects that made the claim in the first place.',
  },
  {
    type: 'quote',
    text: 'Every element on the page should either tell the reader something true, or get out of the way. Skill bars do neither.',
  },
  { type: 'heading', text: 'Spacing did more than any animation' },
  {
    type: 'paragraph',
    text: 'The single biggest improvement to my portfolio came from doubling the whitespace and halving the number of things on each screen. It is the least interesting change I have made and the one people comment on.',
  },
  {
    type: 'list',
    items: [
      'One idea per section, with enough room around it to read as one idea',
      'Two type sizes for body and headings, not five',
      'One accent color, used where you want the eye to land',
      'Nothing moves unless the movement tells the reader something',
    ],
  },
  {
    type: 'paragraph',
    text: 'The last one is the hardest to hold to. I had a scroll-reveal on nearly everything at one point, and the effect was that nothing felt important because everything announced itself.',
  },
  { type: 'heading', text: 'Write the project text for someone skimming' },
  {
    type: 'paragraph',
    text: 'The person reading your portfolio is usually skimming it between two other tasks. They will read the first line of each project and decide whether to read the second. Leading with the technology list wastes that line, because everyone has a technology list.',
  },
  {
    type: 'paragraph',
    text: 'Leading with the problem does not. "A dashboard that replaced a weekly spreadsheet ritual" earns the next sentence in a way that "Built with React, TypeScript and MongoDB" never will.',
  },
  { type: 'heading', text: 'What I would cut first' },
  {
    type: 'list',
    ordered: true,
    items: [
      'Skill bars and percentage ratings of any kind',
      'A hero image of a laptop, a desk, or a coffee cup',
      'Testimonials from people who cannot be contacted',
      'Any animation that runs before the reader has read anything',
    ],
  },
  {
    type: 'paragraph',
    text: 'What is left after cutting all of that is short, and it is much closer to the thing I actually wanted to build: a page a stranger can get through in ninety seconds and still remember something specific about.',
  },
];
