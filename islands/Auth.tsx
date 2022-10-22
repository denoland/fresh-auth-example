import { useState } from "preact/hooks";

export default function Auth() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        const res = await fetch("/api/auth", {
          method: "POST",
          body: JSON.stringify({
            username,
            password,
          }),
        });
        if (res.status === 200) {
          location.reload();
        }
      }}
    >
      <input
        type="text"
        onInput={(e) => setUsername(e.currentTarget.value)}
        value={username}
      />
      <input
        type="password"
        onInput={(e) => setPassword(e.currentTarget.value)}
        value={password}
      />
      <button type="submit">Submit</button>
    </form>
  );
}
