import { toSafeInteger, getPosts } from "@internal";

export const handler = async (req: Request): Promise<Response> => {
  const { searchParams } = new URL(req.url);
  const page = Math.max(toSafeInteger(searchParams.get("page")), 1);

  const data = await getPosts(page);

  return new Response(JSON.stringify(data), {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
