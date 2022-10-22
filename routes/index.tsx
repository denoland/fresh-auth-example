import Login from "../islands/Login.tsx";
import type { Handlers, PageProps } from "$fresh/server.ts";
import { getCookies } from "std/http/cookie.ts";

interface Data {
  isAllowed: boolean;
}

export default function Home({ data }: PageProps<Data>) {
  return (
    <div>
      <a href="/secret_or_custom">secret or custom</a>
      <br />
      <a href="/secret_or_redirect">secret or redirect</a>
      <div>
        You currently {data.isAllowed ? "are" : "are not"} logged in.
      </div>
      {!data.isAllowed ? <Login /> : <a href="/api/logout">Logout</a>}
    </div>
  );
}

export const handler: Handlers = {
  GET(req, ctx) {
    const cookies = getCookies(req.headers);

    return ctx.render!({ isAllowed: cookies.auth === "bar" });
  },
};
