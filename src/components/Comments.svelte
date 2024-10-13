<script lang="ts">
  import "iconify-icon";
  import { createEventDispatcher } from "svelte";

  export let comments: {
    id: number;
    slug: string | null;
    name: string | null;
    created_at: Date | null;
    text: string | null;
  }[] = [];
  export let slug: string;

  let name = "";
  let text = "";
</script>

<section class="mb-xs" id="comments">
  {#each comments as comment}
    <div class="bg-neutral-100 dark:bg-neutral-800 p-xs rounded-lg mb-xs">
      <div class="flex justify-between items-center">
        <p class="text-sm font-semibold font-jost">{comment.name}</p>
        <p class="text-xs text-neutral-500 dark:text-neutral-400">{comment.created_at}</p>
      </div>
      <p class="text-sm text-neutral dark:text-neutral-300">{comment.text}</p>
    </div>
  {/each}
</section>
