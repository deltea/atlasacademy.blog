<script lang="ts">
  import "iconify-icon";
  import { Label } from "bits-ui";
  import { onMount } from "svelte";
  import { Prisma } from "@prisma/client";

  export let slug: string;

  // TODO: Add type for comments
  let comments: any[] = [];

  let text = "";
  let name = "";
  let isLoading = true;

  async function postComment() {
    const response = await fetch("/api/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text, name, slug }),
    });

    console.log(response);
  }

  async function getComments() {
    const response = await fetch(`/api/comments?slug=${slug}`);
    comments = await response.json();
    console.log(comments);
  }

  onMount(async () => {
    await getComments();
    let isLoading = true;
  });
</script>

{#if comments.length > 0}
  <section class="mb-xs" id="comments">
    {#each comments as comment}
      <div class="bg-neutral-100 dark:bg-neutral-800 p-xs rounded-lg mb-xs">
        <div class="flex justify-between items-center">
          <p class="text-sm font-semibold font-jost">
            {comment.name}
          </p>
          <p class="text-xs text-neutral-500 dark:text-neutral-400">
            {new Date(comment.created_at).getMonth() + 1}/{new Date(comment.created_at).getDate()}/{new Date(comment.created_at).getFullYear()}
          </p>
        </div>
        <p class="text-sm text-neutral dark:text-neutral-300">
          {comment.text}
        </p>
      </div>
    {/each}
  </section>
{:else if isLoading}
  <p class="text-sm text-neutral-500 dark:text-neutral-400">
    Loading...
  </p>
{/if}

<!-- Comment submit form -->
<section
  class="w-full space-y-xs"
>
  <div class="space-y-xxs">
    <Label.Root for="text" class="uppercase tracking-widest font-semibold text-sm font-jost" id="createComment">
      Add Comment*
    </Label.Root>

    <textarea
      class="block w-full outline-none p-2 bg-neutral-100 text-neutral"
      id="text"
      name="text"
      rows={5}
      required
      bind:value={text}
    />
  </div>

  <div class="space-y-xxs">
    <Label.Root for="name" class="uppercase tracking-widest font-semibold text-sm font-jost">
      Your Name*
    </Label.Root>

    <input
      type="text"
      class="block w-full outline-none p-2 bg-neutral-100 text-neutral"
      id="name"
      name="name"
      required
      bind:value={name}
    />
  </div>

  <button
    on:click|preventDefault={postComment}
    class="uppercase tracking-widest font-jost font-semibold bg-neutral dark:bg-neutral-100 p-xxs px-xs text-sm text-white dark:text-neutral cursor-pointer"
  >
    Post Comment
  </button>
</section>
