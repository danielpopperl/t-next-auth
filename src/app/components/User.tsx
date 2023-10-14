import { getServerSession } from "next-auth";
import SignIn from "../auth/signin/page";
import { options } from "../api/auth/[...nextauth]/options";

export default async function User() {
  const session = await getServerSession(options);

  return <div key={1}>{session?.user?.name}</div>;
}
