import { Handlers } from "$fresh/server.ts";
import { setCookie } from "std/http/cookie.ts";

export const handler: Handlers = {
  async POST(req) {
    const url = new URL(req.url);
    const { username, password } = await req.json();
    if (username === "deno" && password === "land") {
      const headers = new Headers();
      setCookie(headers, {
        name: "auth",
        value: "bar", // this should be a unique value for each session
        maxAge: 120,
        sameSite: "Lax",
        domain: url.hostname,
        path: "/",
        secure: true,
      });
      return new Response(null, {
        status: 200,
        headers,
      });
    } else {
      return new Response(null, {
        status: 403,
      });
    }
  },
};
