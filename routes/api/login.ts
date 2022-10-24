import { Handlers } from "$fresh/server.ts";
import { setCookie } from "std/http/cookie.ts";

export const handler: Handlers = {
  async POST(req) {
    const url = new URL(req.url);
    const form = await req.formData();
    if (form.get("username") === "deno" && form.get("password") === "land") {
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

      url.pathname = "/";
      headers.set("location", url.href);

      return new Response(null, {
        status: 302,
        headers,
      });
    } else {
      return new Response(null, {
        status: 403,
      });
    }
  },
};
