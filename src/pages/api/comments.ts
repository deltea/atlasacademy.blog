export const prerender = false;

import type { APIRoute } from "astro";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const GET: APIRoute = async ({ request }) => {
  const params = new URL(request.url).searchParams;
  const slug = params.get("slug");

  const comments = await prisma.comments.findMany({
    where: { slug }
  });

  return new Response(
    JSON.stringify(comments),
    { status: 200 }
  );
}

export const POST: APIRoute = async ({ request }) => {
  const data = await request.json();

  console.log(`Name: ${data.name}`);
  console.log(`Text: ${data.text}`);

  const result = await prisma.comments.create({ data });
  console.log(result);

  return new Response(
    JSON.stringify({ success: true }),
    { status: 200 }
  );
}
