import { Handlers } from "$fresh/server.ts";
import { deleteCookie } from "std/http/cookie.ts";

export const handler: Handlers = {
  GET(req) {
    const url = new URL(req.url);
    const headers = new Headers(req.headers);
    deleteCookie(headers, "auth", { path: "/", domain: url.hostname });

    url.pathname = "/";
    headers.set("location", url.href);
    return new Response(null, {
      headers,
      status: 302,
    });
  },
};
