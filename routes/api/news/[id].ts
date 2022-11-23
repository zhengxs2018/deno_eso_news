import { HandlerContext } from "$fresh/server.ts";
import { getPost } from "@internal";

export const handler = async (
  _: Request,
  ctx: HandlerContext
): Promise<Response> => {
  const data = await getPost(ctx.params.id);

  return new Response(JSON.stringify(data), {
    headers: {
      "content-type": "application/json",
    },
  });
};
