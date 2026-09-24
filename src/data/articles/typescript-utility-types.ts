import type { ArticleBlock } from '../../models/article';

export const body: ArticleBlock[] = [
  {
    type: 'paragraph',
    text: 'I once had a folder called helpers with about thirty files in it. Most of them existed to transform one shape into another — pick these three fields, rename this one, make everything optional. TypeScript can express all of that at the type level, and the folder is now four files.',
  },
  { type: 'heading', text: 'The three I reach for first' },
  {
    type: 'paragraph',
    text: 'Pick, Omit and Partial cover the overwhelming majority of what I used to write helper functions for. They are not clever, which is precisely why they have survived every refactor I have put them through.',
  },
  {
    type: 'code',
    language: 'ts',
    code: `interface User {
  id: string;
  email: string;
  displayName: string;
  createdAt: Date;
}

// The shape the API actually returns on create
type UserDraft = Omit<User, 'id' | 'createdAt'>;

// The shape the form edits
type UserForm = Pick<User, 'email' | 'displayName'>;

// The shape a patch accepts
type UserPatch = Partial<UserDraft>;`,
  },
  {
    type: 'paragraph',
    text: 'The thing to notice is that all three derive from one source. When User gains a field, the form type does not silently keep accepting the old shape — the compiler makes me decide what the new field means for each of them.',
  },
  { type: 'heading', text: 'Record, for the maps I kept writing by hand' },
  {
    type: 'paragraph',
    text: 'I used to type lookup objects as an interface and then forget to add the new key. Record with a union key type turns that omission into a compile error, which is the only kind of error I actually enjoy.',
  },
  {
    type: 'code',
    language: 'ts',
    code: `type Status = 'idle' | 'loading' | 'success' | 'error';

// Adding a Status member now breaks this until you handle it
const statusLabel: Record<Status, string> = {
  idle: 'Ready',
  loading: 'Loading…',
  success: 'Done',
  error: 'Something went wrong',
};`,
  },
  { type: 'heading', text: 'ReturnType, for the types I should not be writing' },
  {
    type: 'paragraph',
    text: 'Any time I find myself hand-writing the return type of a function I already wrote, I stop and ask why. ReturnType and its sibling Parameters mean the function is the source of truth and the type follows, which is the direction that does not drift.',
  },
  {
    type: 'quote',
    text: 'Every type you write by hand is a type that can disagree with the code it describes. Derive it instead and the disagreement becomes impossible.',
  },
  { type: 'heading', text: 'Where I stopped' },
  {
    type: 'paragraph',
    text: 'The failure mode of utility types is a type so conditional that nobody can read it, including me a month later. I have a rough rule: if I cannot explain the type out loud in one sentence, it goes back to being an explicit interface.',
  },
  {
    type: 'list',
    items: [
      'Derive types from values wherever a value already exists',
      'Prefer three readable utility types over one clever conditional',
      'When a type needs a comment to be understandable, write the interface instead',
    ],
  },
  {
    type: 'paragraph',
    text: 'None of these replaced logic — they replaced repetition. The folder got smaller because the repetition was where the bugs lived.',
  },
];
