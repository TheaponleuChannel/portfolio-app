<script setup lang="ts">
import type { ArticleBlock } from '../models/article';

defineProps<{ blocks: ArticleBlock[] }>();
</script>

<template>
  <div class="prose-blocks">
    <template v-for="(block, index) in blocks" :key="index">
      <p v-if="block.type === 'paragraph'" class="prose-p">{{ block.text }}</p>

      <h2 v-else-if="block.type === 'heading'" class="prose-h">{{ block.text }}</h2>

      <ol
        v-else-if="block.type === 'list' && block.ordered"
        class="prose-list prose-list--ordered"
      >
        <li v-for="(item, i) in block.items" :key="i">{{ item }}</li>
      </ol>

      <ul v-else-if="block.type === 'list'" class="prose-list">
        <li v-for="(item, i) in block.items" :key="i">{{ item }}</li>
      </ul>

      <blockquote v-else-if="block.type === 'quote'" class="prose-quote">
        <p>{{ block.text }}</p>
        <cite v-if="block.cite">{{ block.cite }}</cite>
      </blockquote>

      <figure v-else-if="block.type === 'code'" class="prose-code">
        <figcaption v-if="block.language" class="prose-code-lang">{{ block.language }}</figcaption>
        <pre><code>{{ block.code }}</code></pre>
      </figure>
    </template>
  </div>
</template>

<style scoped>
.prose-blocks {
  font-size: 1rem;
  line-height: 1.85;
  color: #3f3f46;
}

/* Collapse the leading margin so the first block sits flush under the header */
.prose-blocks > :first-child {
  margin-top: 0;
}

.prose-p {
  margin: 0 0 1.4rem;
}

.prose-h {
  font-size: 1.35rem;
  font-weight: 700;
  line-height: 1.35;
  color: #18181b;
  margin: 2.6rem 0 1.05rem;
  scroll-margin-top: 6rem;
}

/*
 * Deliberately NOT a flex container: making the <li>s flex items turns them
 * into block boxes and suppresses their ::marker, which loses the numbers on
 * ordered lists. list-style-type is set explicitly because Tailwind's
 * preflight resets ol/ul to `list-style: none`.
 */
.prose-list {
  list-style-type: disc;
  margin: 0 0 1.4rem;
  padding-left: 1.4rem;
}

.prose-list--ordered {
  list-style-type: decimal;
}

.prose-list li {
  line-height: 1.75;
  padding-left: 0.15rem;
}

.prose-list li + li {
  margin-top: 0.55rem;
}

.prose-list li::marker {
  color: #6d77ed;
}

.prose-list--ordered li::marker {
  font-weight: 700;
  color: #6d77ed;
}

/* ---------- Pull quote ---------- */
.prose-quote {
  position: relative;
  margin: 2.25rem 0;
  padding: 1.15rem 1.4rem;
  border-left: 3px solid #6d77ed;
  border-radius: 0 0.875rem 0.875rem 0;
  background-image: linear-gradient(90deg, rgba(109, 119, 237, 0.09), rgba(151, 77, 209, 0.05));
}

.prose-quote p {
  margin: 0;
  font-style: italic;
  font-size: 1.02rem;
  line-height: 1.7;
  color: #27272a;
}

.prose-quote cite {
  display: block;
  margin-top: 0.6rem;
  font-size: 0.8rem;
  font-style: normal;
  color: #71717a;
}

/* ---------- Code ---------- */
.prose-code {
  position: relative;
  margin: 1.9rem 0;
  border-radius: 0.875rem;
  overflow: hidden;
  background-color: #0f172a;
  border: 1px solid rgba(15, 23, 42, 0.6);
  box-shadow: 0 6px 20px rgba(15, 23, 42, 0.16);
}

.prose-code-lang {
  position: absolute;
  top: 0.6rem;
  right: 0.85rem;
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #64748b;
  user-select: none;
}

.prose-code pre {
  margin: 0;
  padding: 1.3rem 1.4rem;
  overflow-x: auto;
  scrollbar-width: thin;
}

.prose-code code {
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, 'Liberation Mono', monospace;
  font-size: 0.83rem;
  line-height: 1.75;
  color: #e2e8f0;
  white-space: pre;
  tab-size: 2;
}

.prose-code pre::-webkit-scrollbar {
  height: 6px;
}

.prose-code pre::-webkit-scrollbar-thumb {
  background-color: rgba(148, 163, 184, 0.35);
  border-radius: 9999px;
}

/* ==========================================================================
   DARK
   ========================================================================== */
.my-app-dark .prose-blocks {
  color: #a1a1aa;
}

.my-app-dark .prose-h {
  color: #f4f4f5;
}

.my-app-dark .prose-quote {
  background-image: linear-gradient(90deg, rgba(109, 119, 237, 0.16), rgba(151, 77, 209, 0.08));
}

.my-app-dark .prose-quote p {
  color: #e4e4e7;
}

.my-app-dark .prose-quote cite {
  color: #a1a1aa;
}

.my-app-dark .prose-code {
  background-color: #0b1120;
  border-color: rgba(255, 255, 255, 0.08);
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.4);
}

/* ==========================================================================
   SMALL SCREENS
   ========================================================================== */
@media (max-width: 639px) {
  .prose-blocks {
    font-size: 0.94rem;
    line-height: 1.8;
  }

  .prose-h {
    font-size: 1.15rem;
    margin: 2rem 0 0.85rem;
  }

  .prose-quote {
    margin: 1.75rem 0;
    padding: 0.95rem 1.1rem;
  }

  .prose-quote p {
    font-size: 0.95rem;
  }

  .prose-code {
    margin: 1.5rem 0;
    border-radius: 0.75rem;
  }

  .prose-code pre {
    padding: 1rem;
  }

  .prose-code code {
    font-size: 0.76rem;
  }
}
</style>
