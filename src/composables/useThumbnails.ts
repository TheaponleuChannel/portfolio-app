import { ref, type Ref } from 'vue';
import type { Resource } from '../models/resource';

const thumbnailCache = new Map<string, string>();

/** Extract a YouTube video ID from various URL formats. */
function extractYouTubeId(url: string): string | null {
  try {
    const u = new URL(url);
    // youtube.com/watch?v=ID
    if (u.hostname.includes('youtube.com') && u.searchParams.has('v')) {
      return u.searchParams.get('v');
    }
    // youtu.be/ID
    if (u.hostname === 'youtu.be') {
      return u.pathname.slice(1);
    }
    // youtube.com/embed/ID or youtube.com/v/ID
    const embedMatch = u.pathname.match(/\/(?:embed|v)\/([\w-]{11})/);
    if (embedMatch) return embedMatch[1];
  } catch {
    // not a valid URL
  }
  return null;
}

/**
 * Get a thumbnail URL for a link.
 * YouTube thumbnails are built directly; other URLs use the Microlink API.
 */
export async function fetchThumbnail(url: string): Promise<string | null> {
  if (thumbnailCache.has(url)) return thumbnailCache.get(url)!;

  // --- YouTube: build thumbnail URL directly (no API needed) ---
  const ytId = extractYouTubeId(url);
  if (ytId) {
    // Try maxresdefault first, fall back to hqdefault
    const thumbUrl = `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`;
    thumbnailCache.set(url, thumbUrl);
    return thumbUrl;
  }

  // --- Other URLs: use Microlink metadata API ---
  try {
    const res = await fetch(`https://api.microlink.io?url=${encodeURIComponent(url)}&meta=true`);
    const json = await res.json();
    const imageUrl = json?.data?.image?.url ?? null;
    if (imageUrl) thumbnailCache.set(url, imageUrl);
    return imageUrl;
  } catch {
    return null;
  }
}

/**
 * Returns a reactive list of resources enriched with fetched thumbnail images.
 * Each resource's `image` is set to the thumbnail when available and no explicit image exists.
 */
export function useThumbnails(resources: Resource[]): {
  enrichedResources: Ref<Resource[]>;
  loading: Ref<boolean>;
} {
  const enrichedResources = ref<Resource[]>(
    resources.map((r) => ({ ...r })),
  );
  const loading = ref(true);

  async function fetchAll() {
    const promises = enrichedResources.value.map(async (resource, i) => {
      if (resource.image) return; // already has an explicit image
      const thumb = await fetchThumbnail(resource.link);
      if (thumb) {
        // Create a new object so Vue detects the change
        enrichedResources.value[i] = { ...resource, image: thumb };
      }
    });

    await Promise.allSettled(promises);
    loading.value = false;
  }

  fetchAll();

  return { enrichedResources, loading };
}
