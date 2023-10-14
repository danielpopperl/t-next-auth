"use client";

import { signIn, useSession } from "next-auth/react";

export default function Home() {
  const session = useSession();
  return (
    <>
      <div>name {session.data?.user?.name}</div>
      <div>email {session.data?.user?.email}</div>
      <button onClick={() => signIn()}>SIGIN</button>
    </>
  );
}
