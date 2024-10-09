<script lang="ts">
  import { Label } from "bits-ui";
  import "iconify-icon";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher<{
    slug: string;
    name: string;
    text: string;
  }>();

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

  <form
    class="w-full space-y-xs"
    on:submit|preventDefault={(() => dispatch("createComment", { slug, name, text }))}
  >
    <div class="space-y-xxs">
      <Label.Root for="body" class="uppercase tracking-widest font-semibold text-sm font-jost">
        Add Comment*
      </Label.Root>
      <textarea
        name="Add Comment"
        class="block w-full outline-none p-2 bg-neutral-100 text-neutral"
        id="body"
        rows={5}
        bind:value={text}
        required
      />
    </div>

    <div class="space-y-xxs">
      <Label.Root for="author" class="uppercase tracking-widest font-semibold text-sm font-jost">
        Your Name* 
      </Label.Root>
      <input
        type="text"
        class="block w-full outline-none p-2 bg-neutral-100 text-neutral"
        id="author"
        bind:value={name}
        required
      />
    </div>

    <input
      type="submit"
      value="Post Comment"
      class="uppercase tracking-widest font-jost font-semibold bg-neutral dark:bg-neutral-100 p-xxs px-xs text-sm text-white dark:text-neutral cursor-pointer"
    />
  </form>
</section>
