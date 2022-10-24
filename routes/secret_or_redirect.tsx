import type { Handlers } from "$fresh/server.ts";
import { getCookies } from "std/http/cookie.ts";

export default function Home() {
  return (
    <div>
      Here is some secret
    </div>
  );
}

export const handler: Handlers = {
  GET(req, ctx) {
    const cookies = getCookies(req.headers);
    if (cookies.auth === "bar") {
      return ctx.render!();
    } else {
      const url = new URL(req.url);
      url.pathname = "/";
      return Response.redirect(url);
    }
  },
};
